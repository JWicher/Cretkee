import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import utils from "./services/utils";
import cryptingService from "./services/cryptingService";
import constants from "./constants/constants";
import NotificationComponent from "./notificationComponent";
import KeyPartInputsBox from "./keyPartInputsBox";

const ChangeFileKeyModal = ({ isVisible, currentKeyToEncryptFile, passwordExample, onUpdateFileKey, onShowChangeFileKeyModal, onUpdatePasswordKeyHandler }) => {
  const [notificationObject, setNotificationObject] = useState(null);
  const [focusedProperty, setFocusedProperty] = useState("oldKeyToConfirm");
  const [focusedKeyType, setFocusedKeyType] = useState("fileKey");

  const [keyObject, setKeyObject] = useState({
    oldKeyToConfirm: "",
    newKey: "",
    repeatedNewKey: ""
  });

  const handleInputUpdateKey = (value) => {
    const updatedKey = {...keyObject}
    updatedKey[focusedProperty] += value.toLowerCase();
    setKeyObject(updatedKey)
  };

  const resetValue = (value) => {
    const updatedKey = {...keyObject}
    updatedKey[value] = "";

    setKeyObject(updatedKey)
  };

  const focusePropertyHandler = (property) => {
    setFocusedProperty(property)
  }

  const validateData = async () => {
    const { oldKeyToConfirm, newKey, repeatedNewKey } = keyObject;

    if(newKey !== repeatedNewKey){
      showNotification({message: "Password was not correctly repeated", type: "error"})
      return false
    }

    if(newKey.length <= 3){
      showNotification({message: "Password is to short", type: "error"})
      return false
    }

    switch(focusedKeyType){
      case "fileKey":
        if(oldKeyToConfirm !== currentKeyToEncryptFile){
          showNotification({message: "Wrong old key", type: "error"})
          return false
        }
        break
      case "passwordKey":
        const isValidPasswordKey = await cryptingService.decrypt({content: passwordExample, key: keyObject.oldKeyToConfirm})
        if(!isValidPasswordKey){
          showNotification({message: "Wrong old key", type: "error"})
          return false
        }
        break
    }

    showNotification({message: "Key to file was updated", type: "success"})

    await utils.sleep(2500)
    return true;
  }

  const checkDataAndUpdateFileKe = async () => {
    const isDataValid = await validateData();

    if(!isDataValid){
      return 
    }

    switch(focusedKeyType){
      case "fileKey":
        onUpdateFileKey(keyObject.oldKeyToConfirm, keyObject.newKey);
        break
      case "passwordKey":
        onUpdatePasswordKeyHandler(keyObject.oldKeyToConfirm, keyObject.newKey);
        break
    }
    onShowChangeFileKeyModal(false);
  }

  const resetAndCloseModalHandler = () => {
    setNotificationObject(null)
    onShowChangeFileKeyModal(false)
  }

  const showNotification = ({message, type}) => {
    setNotificationObject({message, type})
    setTimeout(
      () => setNotificationObject(null),
      2500
      )
  }

  const getInputValueStyle = (propertyToCheck) => {
    const focusedStyle = { ...styles.inputValue, ...styles.inputValueFocused};
    const defaultStyle = styles.inputValue;
    const inputValueStyle = focusedProperty === propertyToCheck ? focusedStyle : defaultStyle;
    return inputValueStyle;
  }

  const getKeyTypeFocusStyle = (typeToCheck) => {
    const focusedStyle = { ...styles.keyType, ...styles.focusedText};
    const defaultStyle = styles.keyType;
    const inputValueStyle = focusedKeyType === typeToCheck ? focusedStyle : defaultStyle;
    return inputValueStyle;
  }

  useEffect(() => setKeyObject({
    oldKeyToConfirm: "",
    newKey: "",
    repeatedNewKey: ""
  }), [isVisible])

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputContainer}>
      <View style={styles.keyTypeBox}>
        <Text style={styles.title}>Update</Text>
        <Text
          style={getKeyTypeFocusStyle("fileKey")}
          onPress={() => setFocusedKeyType("fileKey")}
          >file key
        </Text>
        <Text style={styles.title}>/</Text>
        <Text
          style={getKeyTypeFocusStyle("passwordKey")}
          onPress={() => setFocusedKeyType("passwordKey")}
          >password key
        </Text>
      </View>
        { notificationObject &&
          <NotificationComponent 
            message={notificationObject.message}
            type={notificationObject.type}
          />
        }
        <View style={styles.inputWrap}>
            <Text>Old key:</Text>
            <View style={styles.inputBox}>
              <Text
                style={getInputValueStyle("oldKeyToConfirm")}
                onPress={() => focusePropertyHandler("oldKeyToConfirm")}
                >{"*".repeat(keyObject.oldKeyToConfirm.length)}
              </Text>
              <Text
                style={styles.resetValueButton}
                onPress={() => resetValue("oldKeyToConfirm")}
                >x
              </Text>
            </View>
        </View>

        <View style={styles.inputWrap}>
            <Text>New key:</Text>
              <View style={styles.inputBox}>
                <Text
                  style={getInputValueStyle("newKey")}
                  onPress={() => focusePropertyHandler("newKey")}
                  >{keyObject.newKey}
                </Text>
                <Text
                  style={ styles.resetValueButton}
                  onPress={() => resetValue("newKey")}
                  >x
                </Text>
              </View>
        </View>

        <View style={styles.inputWrap}>
            <Text>Repeat new key:</Text>
            <View style={styles.inputBox}>
              <Text
                style={getInputValueStyle("repeatedNewKey")}
                onPress={() => focusePropertyHandler("repeatedNewKey")}
                >{keyObject.repeatedNewKey}
              </Text>
              <Text
                style={styles.resetValueButton}
                onPress={() => resetValue("repeatedNewKey")}
                >x
              </Text>
            </View>
        </View>
        
        <KeyPartInputsBox
            inputValues={ constants.KEY_INPUT_VALUES }
            onHandleInputUpdateKey={handleInputUpdateKey}
            inputSquareStyle="inputSquareBlue"
        />

        <View style={styles.buttonBox}>
          <View style={styles.button}>
            <Button title="Update" color="#00C853" onPress={ () => checkDataAndUpdateFileKe()} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color="#D50000" onPress={ () => resetAndCloseModalHandler()} />
          </View>
        </View>
      </View>
    </Modal>
  );s
};

export default ChangeFileKeyModal;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 5,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
    padding: 5,
    color: "black"
  },
  keyTypeBox: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  keyType: {
    color: "black",
    fontSize: 25,
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontStyle: "italic"
  },
  focusedText: {
    color: "#00C853",
    borderBottomColor: "#00C853"
  },
  inputWrap: {
    marginBottom: 10
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  inputValue: {
    borderColor: "black",
    width: "79%",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 30,
    alignContent: "center",
    textAlignVertical: 'center'
  },
  inputValueFocused: {
    borderColor: "#03A9F4",
  },
  buttonBox: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    width: "39%",
    alignItems: "stretch",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  },
  resetValueButton: {
    backgroundColor: "#D50000",
    width: "10%",
    textAlignVertical: 'center',
    textAlign: "center",
    borderRadius: 5,
    color: "white"
  }
});
