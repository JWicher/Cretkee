import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import constants from "../components/constants/constants";

const HeaderButtons = ({onEncodePassword, onShowDetails, onCloseModal}) => {

  return (
    <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.encodeButton} onPress={() => onEncodePassword()} ></TouchableOpacity>
        <TouchableOpacity style={styles.encodeButton} onPress={() => onShowDetails()} ></TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => onCloseModal()} >
            <Text >
              <FontAwesomeIcon icon={faTimes} color={constants.colors.secondary}/>
            </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        zIndex: 2
      },
      encodeButton: {
        width: 50,
        height: 50,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      closeButton: {
        width: 35,
        height: 35,
        backgroundColor: constants.colors.error,
        borderRadius: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
})

export default HeaderButtons;
