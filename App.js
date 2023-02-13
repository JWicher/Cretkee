import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Item from "./components/item";
import Header from "./components/header";
import cryptingService from "./components/services/cryptingService";
import fileService from "./components/services/fileService";
import KeyPartInputsBox from "./components/keyPartInputsBox";
import constants from "./components/constants/constants";
import ChangeFileKeyModal from "./components/changeFileKeyModal";
import SearchBar from "./components/searchBar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credencials: [],
      originalCredencials: [],
      encryptedFileContent: "",
      keyToEncryptFile: "",
      searchText: "",
      isError: false,
      isUpdateFileKeyMode: false,
      showSuccess: false
    };
  }

  loadFileContent = async (encryptedFileContent) => {
    this.setState({
      encryptedFileContent,
      keyToEncryptFile: ""
    });
  }

  decryptFileContent = async () => {
    try{
      const { encryptedFileContent, keyToEncryptFile } = this.state;
      const decryptedFileContent = await cryptingService.decrypt({content: encryptedFileContent, key: keyToEncryptFile});
  
      if(!decryptedFileContent){
        this.setState({
          isError: true,
          keyToEncryptFile: ""
        })
      }
      
      const decryptedCredencials = JSON.parse(decryptedFileContent);
  
      this.setState({
        credencials: decryptedCredencials,
        originalCredencials: decryptedCredencials,
        encryptedFileContent: "",
        isError: false,
        showSuccess: true
      })
    }
    catch(error){
      console.log('decryptFileContent error', error)
      this.setState({
        isError: true,
        keyToEncryptFile: ""
      })
      setTimeout(() => this.setState({isError: false}), 50)
    }
  }

  updatedCredencialsHandller = async(newCredencialList) => {
    try{
      const { credencials, keyToEncryptFile } = this.state;
      const updatedCredencials = [...credencials];

      const encryptedNewCredencialList = await cryptingService.encryptProperites({
        credencialObject: newCredencialList,
        properties: ["password"],
        key: keyToEncryptFile
      });

      const index = updatedCredencials.findIndex( item => item._id === encryptedNewCredencialList._id);
      updatedCredencials[index] = encryptedNewCredencialList;
      
      const stringifiedCredencials = JSON.stringify(updatedCredencials);
      const encodedNewCredencials = await cryptingService.encrypt({content: stringifiedCredencials, key: keyToEncryptFile})

      await fileService.writeFileContent(encodedNewCredencials)
      
      this.setState({
        credencials: updatedCredencials,
        originalCredencials: updatedCredencials
      })
    }
    catch(error){
      // TODO here error message
      console.log('updatedCredencialsHandller error', error)
    }
  }

  handleInputUpdateKey = (keyValue) => {
    const { keyToEncryptFile } = this.state;
    const updatedKey = keyToEncryptFile + keyValue;
    this.setState({keyToEncryptFile: updatedKey})
  }

  updateFileKeyHandler = async (newKey) => {
    try{
      const { credencials } = this.state;
      const stringifiedCredencials = JSON.stringify(credencials);
      const encryptedNewCredencials = await cryptingService.encrypt({content: stringifiedCredencials, key: newKey})

      await fileService.writeFileContent(encryptedNewCredencials)
      this.setState({keyToEncryptFile: newKey})
    }
    catch(error){
      // TODO here error message
      console.log("updateFileKeyHandler error", error)
    }
  }

  updatePasswordKeyHandler = async (oldPasswordKey, newPasswordKey) => {
    try{
      const { credencials, keyToEncryptFile } = this.state;

      const credencialsWithChangedPasswordKey = await cryptingService.encryptAllPasswords(credencials, oldPasswordKey, newPasswordKey);
      const stringifiedCredencials = JSON.stringify(credencialsWithChangedPasswordKey);
      const encryptedNewCredencials = await cryptingService.encrypt({content: stringifiedCredencials, key: keyToEncryptFile})

      await fileService.writeFileContent(encryptedNewCredencials)
      this.setState({credencials: credencialsWithChangedPasswordKey})
    }
    catch(error){
      // TODO here error message

      console.log("updatePasswordKeyHandler error", error)
    }
  }


  showChangeFileKeyModalHandler = (bool) => {
    this.setState({isUpdateFileKeyMode: bool})
  }

  clearState = () => {
    const clearState = {
      credencials: [],
      encryptedFileContent: "",
      keyToEncryptFile: "",
      isError: false,
      isUpdateFileKeyMode: false,
      showSuccess: false
    };
    this.setState(clearState)
  }

  updateSearchText = (value) => {
    this.setState({searchText: value})
  };
  
  filterCredencials = (originalCredencials, searchText) => {
    console.log('filterCredencials', searchText)
    if(!searchText.length){
      return originalCredencials;
    }

    const filteredCredencials = originalCredencials.filter( cred => cred.name.toLowerCase().includes(searchText.toLowerCase()) );
    return filteredCredencials;
  }

  render() {
    const { originalCredencials, searchText, encryptedFileContent, keyToEncryptFile, isUpdateFileKeyMode, isError } = this.state;
    const credencials = this.filterCredencials(originalCredencials, searchText)

    console.log('rerender app', originalCredencials.length, credencials.length)
    return (
      <View style={styles.container}>

        <ChangeFileKeyModal
          isVisible={isUpdateFileKeyMode}
          currentKeyToEncryptFile={keyToEncryptFile}
          passwordExample={credencials.length && credencials[0].password}
          onUpdateFileKey={this.updateFileKeyHandler}
          onUpdatePasswordKeyHandler={this.updatePasswordKeyHandler}
          onShowChangeFileKeyModal={this.showChangeFileKeyModalHandler}
        />

        <View>
          <Header
            isError={isError}
            isContentLoaded={!!encryptedFileContent}
            isContentDecrypted={!!credencials.length}
            isShowSuccess={this.state.showSuccess}
            onLoadFileContent={this.loadFileContent}
            onDecryptFileContent={this.decryptFileContent}
            onShowChangeFileKeyModal={this.showChangeFileKeyModalHandler}
            onClearState={this.clearState}
          />
          { !!credencials.length &&
            <SearchBar onUpdateSearchText={this.updateSearchText}/>
            }
        </View>

        {
          !!encryptedFileContent.length ?
            <KeyPartInputsBox
              inputValues={ constants.KEY_INPUT_VALUES }
              onHandleInputUpdateKey={this.handleInputUpdateKey}
              inputSquareStyle="inputSquareBlack"
            />
            :
            <FlatList
              numColumns={2}
              data={credencials}
              keyExtractor={ itemData => "key" + itemData._id}
              renderItem={(item) => {
                return <Item
                  itemData={item}
                  index={item.index}
                  onUpdatedCredencialsHandller={this.updatedCredencialsHandller}
                />
              }}
            />
        }

      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  soundPlayer: {
    width: 100,
    height: 50,
    backgroundColor: "red",
    marginBottom: 100
  }
});