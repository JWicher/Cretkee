import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import constants from "./constants/constants";

const KeyPartInputsBox = ({inputValues, onHandleInputUpdateKey, inputSquareStyle }) => {
  return (
    <View style={styles.inputSquareBox}>
      { inputValues.map( value => (
        <TouchableOpacity
          style={styles.box}
          onPress={() => onHandleInputUpdateKey(value)}
          key={value}
          >
          <View style={styles[inputSquareStyle || "inputSquareDefault"]}>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default KeyPartInputsBox;

const styles = StyleSheet.create({
  inputSquareBox: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  inputSquareDefault: {
    minWidth: 110,
    height: 103,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#03A9F4",
    margin: 1
  },
  inputSquareBlack: {
    minWidth: 110,
    height: 103,
    borderBottomWidth: 1,
    borderColor: constants.colors.secretColor,
    borderRadius: 20,
    margin: 1
  },
  inputSquareBlue: {
    minWidth: 110,
    height: 103,
    borderWidth: 1,
    borderColor: "#03A9F4",
    borderRadius: 20,
    margin: 1
  },
  box: {
    height: 105
  }
});
