import { MotiView } from "moti"
import React, { forwardRef, useCallback } from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native"
import { spacing, borderRadius, colors } from "../constants/style"

interface INewTodoInputProps {
  onSubmit: (title: string) => void
  onBlur: () => void
}

export const NewTodoInput = forwardRef<TextInput, INewTodoInputProps>(
  ({ onSubmit, onBlur }, ref) => {
    const onSubmitEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        onSubmit(e.nativeEvent.text)
      },
      [onSubmit],
    )

    return (
      <MotiView
        from={{ marginTop: -50 }}
        animate={{ marginTop: 0 }}
        transition={{
          type: "timing",
          duration: 300,
        }}
      >
        <TextInput
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
          placeholder="E.g. Buy milk"
          style={styles.input}
        />
      </MotiView>
    )
  },
)

const styles = StyleSheet.create({
  input: {
    padding: spacing.m,
    borderWidth: 2,
    borderRadius,
    borderColor: colors.accent,
    marginBottom: spacing.s,
  },
})
