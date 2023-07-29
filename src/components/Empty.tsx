import { View, Text, StyleSheet } from "react-native"
import React from "react"

export const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nothing to see here.{"\n"}Add a todo to get started.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    allignItems: "center",
  },
  text: {
    textAlign: "center",
  },
})
