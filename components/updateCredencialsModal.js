import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Text, View, Button, Modal } from "react-native";

const UpdateCredencialsModal = ({
  item,
  isVisible,
  onUpdateHandler,
  onCloseUpdateCredencialsModal
}) => {
  const [thisItem, setThisItem] = useState(item);

  const valueInputHandler = (enteretText, property) => {
    const updatedItem = {...thisItem}
    updatedItem[property] = enteretText;

    setThisItem(updatedItem)
  };

  const propertiesToRender = Object.keys(item).filter(p => p !== "_id");


  useEffect(() => {
    setThisItem(item)
  }, [item])

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Update credencial</Text>
        {
          propertiesToRender.map( property => (
            <View style={styles.inputBox} key={property}>
                  <Text>{property}:</Text>
                  <TextInput
                    placeholder={thisItem[property]}
                    style={styles.inputText}
                    onChangeText={(enteretText) => valueInputHandler(enteretText, property)}
                    value={thisItem[property]}
                  />
              </View>
          ))
        }
        
        <View style={styles.buttonBox}>
          <View style={styles.button}>
            <Button title="Update" onPress={ () => onUpdateHandler(thisItem)} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={ () => onCloseUpdateCredencialsModal()} />
          </View>
        </View>
      </View>
    </Modal>
  );s
};

export default UpdateCredencialsModal;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 5,
    justifyContent: "center",
    flex: 1
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20
  },
  inputBox: {
    marginBottom: 10
  },
  inputText: {
    borderColor: "black",
    width: "100%",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 5
  },
  buttonBox: {
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
  }
});
