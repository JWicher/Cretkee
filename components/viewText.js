import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "./constants/constants";

const ViewText = ({
  text,
  dedicatedViewStyles,
  dedicatedTextStyles,
  selectableType = true,
  specialHandler = () => {}
}) => {

  return (
    <View style={styles[dedicatedViewStyles]} >
      <Text style={styles[dedicatedTextStyles || "defaultTextStyle"]} onPress={() => specialHandler()} selectable={selectableType}> {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: constants.colors.primary
  },
  title: {
    minWidth: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  titleText: {
    fontSize: 30,
    color: constants.colors.primary,
    textAlign: "center"
  },
  defaultTextStyle: {
    color: constants.colors.primary
  },
  hiddenPassword: {
    color: constants.colors.secretColor
  },
})

export default ViewText;
