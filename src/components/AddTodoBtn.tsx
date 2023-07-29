import React from "react"
import { StyleSheet } from "react-native"
import { spacing } from "../constants/style"
import { ActionButton } from "./ActionButton"

interface IAddTodoBtnProps {
  onPress: () => void
}

export const AddTodoBtn = ({ onPress }: IAddTodoBtnProps) => {
  return <ActionButton title="Add a todo" onPress={onPress} style={styles.button} />
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: spacing.m,
    right: spacing.m,
  },
})
