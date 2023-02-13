import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import UpdateCredencialsModal from "./updateCredencialsModal";
import CredencialDetails from "./credencialDetails";
import cryptingService from "./services/cryptingService";
import constants from "./constants/constants";

const Item = ({ itemData, onUpdatedCredencialsHandller}) => {
  const [credencialItem, setCredencialItem] = useState(itemData.item);
  const [isShowDetailsMode, setIshowDetailsMode] = useState(false);
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);

  const updateCredencialHandler = (newCredencialObject) => {
    setCredencialItem(newCredencialObject)
    onUpdatedCredencialsHandller(newCredencialObject)
    setUpdateMode(false)
  };


  const encodePassword = async (key) => {

    const decryptedPassword = await cryptingService.decrypt({
      content: credencialItem.password,
      key: key
    })

    if(decryptedPassword){

      const newCredencialObject = {...credencialItem};
      newCredencialObject.password = decryptedPassword
      setCredencialItem(newCredencialObject)
      setIsDecrypted(true);
    }
    else{
      setCredencialItem(itemData.item)

      setIsDecrypted(false);
    }
  };

  const closeCredencialDetails = () => {
    setIshowDetailsMode(false)
    setCredencialItem(itemData.item)
    setIsDecrypted(false);
  }

  return (
    <TouchableOpacity onPress={() => setIshowDetailsMode(true)}>
      <UpdateCredencialsModal
        isVisible={isUpdateMode}
        item={credencialItem}
        onUpdateHandler={updateCredencialHandler}
        onCloseUpdateCredencialsModal={() => setUpdateMode(false) }
      />
      <CredencialDetails
        isShowDetailsMode={isShowDetailsMode}
        item={credencialItem}
        isDecrypted={isDecrypted}
        onSetUpdateMode={setUpdateMode}
        onEncodePasswordHanndler={encodePassword}
        setShowDetailsMode={() => closeCredencialDetails()}
      />
      <View style={styles.credencialCard}>
        <Text style={styles.itemTitleStyle} numberOfLines={2} >{credencialItem.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  credencialCard: {
    marginTop: 1,
    backgroundColor: "#ECEFF1",
    margin: 3,
    minWidth: "49%",
    height: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitleStyle: {
    color: constants.colors.primary,
    textAlign: "center",
    fontSize: 12
  }
});
