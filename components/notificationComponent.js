import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NotificationComponent = ({message, type = "info"}) => {
    return (
      <View style={styles[type]}>
        <Text style={styles[`text${type}`]}>{message}</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  info: {
    padding: 5,
    backgroundColor: "#29B6F6",
    marginBottom: 10
  },
  error: {
    padding: 5,
    backgroundColor: "#D50000",
    color: "white",
    marginBottom: 10,
  },
  success: {
    padding: 5,
    backgroundColor: "#00E676",
    marginBottom: 10
  },
  texterror: {
    textAlign: "center",
    color: "white"
  }
})

export default NotificationComponent