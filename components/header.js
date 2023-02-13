import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from "react-native";
import fileService from "./services/fileService";
import constants from "./constants/constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const Header = ({
  isError,
  isContentLoaded,
  isContentDecrypted,
  isShowSuccess,
  onLoadFileContent,
  onDecryptFileContent,
  onShowChangeFileKeyModal,
  onClearState
}) => {
  const [styleKey, setStyleKey] = useState("defaltTitleStyle");

  const readFileContent = async () => {
    try {
      const encodedDontent = await fileService.getFileContent();
      onLoadFileContent(encodedDontent);
    }
    catch (error) {
      throw error
    }
  }

  const runHandler = () => {
    if(isContentLoaded){
      onDecryptFileContent()
    }
    return
  }

  const readFileContentHandler = async () => {
    await readFileContent();
    isContentDecrypted && onClearState()
  };
  const closeApp = () => {
    BackHandler.exitApp();
  }

  useEffect(() => {
    let currentKeyStyle = isError ? "errorText" : "defaltTitleStyle";

    if(isShowSuccess){
      currentKeyStyle = "successText";
      setTimeout(() => setStyleKey("defaltTitleStyle"), 50)
    }
    setStyleKey(currentKeyStyle);
  }, [isContentLoaded, isError])

  return (
      <View style={styles.header}>
        <Text
          style={styles[styleKey]}
          onPress={ () =>  runHandler()}
          >CRETKY
        </Text>
        {/* <InitFileButton /> */}
        <TouchableOpacity
          style={styles.selectSource}
          onPress={async() => await readFileContentHandler()} >
        </TouchableOpacity>

        { isContentDecrypted &&
          <TouchableOpacity
            style={styles.changeKeyButton}
            onPress={() => onShowChangeFileKeyModal(true)} >
            <Text style={styles.setNewFileKeyButton}>
              <FontAwesomeIcon icon={faEdit} color={constants.colors.primary}/>
            </Text>
          </TouchableOpacity>

        }
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => closeApp()} >
          <Text style={styles.closeButtonText}>
            <FontAwesomeIcon icon={faSignOutAlt} color={constants.colors.secondary}/>
          </Text>
        </TouchableOpacity>
      </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 2,
    paddingLeft: 10,
    paddingVertical: 5,
    height: 45,
    backgroundColor: constants.colors.primary,
    borderColor: constants.colors.secondary,
    borderBottomWidth: 1,
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectSource: {
    width: 40,
    height: "100%",
  },
  defaltTitleStyle: {
    color: constants.colors.secondary,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  changeKeyButton: {
    paddingHorizontal: 9,
    borderWidth: 1,
    height: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.colors.secondary
  },
  closeButton: {
    paddingHorizontal: 9,
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.colors.error
  },
  closeButtonText: {
    color: constants.colors.secondary,
    fontWeight: "bold",
  },
  successText: {
    color: constants.colors.success,
    fontWeight: "bold"
  },
  errorText: {
    color: constants.colors.error,
    fontWeight: "bold",
  },
  setNewFileKeyButton: {
    textAlign: "center",
    color: constants.colors.primary,
    fontWeight: "bold"
  }
});
