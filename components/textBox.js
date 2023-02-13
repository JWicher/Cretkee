import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "./constants/constants";

const TextBox = ({title, message}) => {

  return (
    <View style={styles.textBox}>
        <Text style={styles.textBoxTitle}>{title}:</Text>
        <Text style={styles.textBoxDetails}>{message}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
    textBox: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: constants.colors.primary,
        color: constants.colors.primary
      },
      textBoxTitle: {
        color: constants.colors.primary
      },
    textBoxDetails: {
      marginLeft: 10,
      color: constants.colors.primary
    }
});
