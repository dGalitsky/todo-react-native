import React, { useCallback } from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native"
import { colors, spacing } from "../constants/style"

interface IAddTodoProps {
  onSubmit: (title: string) => void
}

export const AddTodo = ({ onSubmit }: IAddTodoProps) => {
  const inputRef = React.useRef<TextInput>(null)

  const onSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmit(e.nativeEvent.text)
      inputRef.current?.clear()
    },
    []
  )

  return (
    <TextInput
      ref={inputRef}
      onSubmitEditing={onSubmitEditing}
      placeholder="New todo..."
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    padding: spacing.m,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.m,
  },
})
