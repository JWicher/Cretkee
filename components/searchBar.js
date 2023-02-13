import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import constants from './constants/constants';

const SearchBar = ({ onUpdateSearchText }) => {
    const [searchText, setSearchText] = useState("");

    const searchInputHandler = (value) => {
        setSearchText(value);
        onUpdateSearchText(value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.searchButton} >
                <FontAwesomeIcon icon={faSearch} color={constants.colors.primary}/>
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={searchText}
                onChangeText={(txt) => searchInputHandler(txt)}
            />
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        padding: 2,
        marginBottom: 4,
        borderBottomWidth: 1,
        borderRadius: 5
      },
      inputStyle: {
          flex: 1,
          paddingVertical: 0,
          paddingHorizontal: 10,
          borderLeftWidth: 1
      },
      searchButton: {
          borderRightWidth: 0,
          textAlignVertical: "center",
          paddingHorizontal: 10,
          opacity: 0.2,
          color: constants.colors.primary
      }
})

export default SearchBar;