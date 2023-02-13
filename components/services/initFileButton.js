import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import mockDb from "../mock/credencialsData.json";
import cryptingService from "./cryptingService";
import fileService from "./fileService";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import constants from "../constants/constants";

const InitFileButton = () => {

    const cryptFile = async () => {
        const credWithEncryptedPasswords = await cryptingService.init_encryptAllPasswords(mockDb, "bbbb");
        const toEncrypt = JSON.stringify(credWithEncryptedPasswords)

        const encrytped = await cryptingService.encrypt({content: toEncrypt, key: "aaaa"});

        await fileService.writeFileContent(encrytped)
    }
    
  return (
        <TouchableOpacity style={styles.cryptButton} onPress={() => cryptFile()} >
            <Text style={styles.setNewFileKeyButton}>
              <FontAwesomeIcon icon={faPlayCircle} color={constants.colors.primary}/>
            </Text>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cryptButton: {
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: constants.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})

export default InitFileButton;
