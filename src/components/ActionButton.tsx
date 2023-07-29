import React from "react"
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"
import { borderRadius, colors, spacing } from "../constants/style"

interface IActionButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

export const ActionButton = ({ title, onPress, style }: IActionButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: spacing.m,
    backgroundColor: colors.accent,
    borderRadius,
  },
  text: {
    color: colors.textLight,
  },
})
