import React, { useCallback, useState } from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from "react-native"
import { colors, spacing } from "../constants/style"
import { useTodosQuery } from "../hooks/useTodosQuery"

export const Todo = ({ id, title, completed }: ITodo) => {
  const [isEditing, setIsEditing] = useState(false)
  const { updateTodo, removeTodo } = useTodosQuery()

  const onPress = useCallback(() => {
    updateTodo({ id, title, completed: !completed })
  }, [updateTodo, id, title, completed])

  const onLongPress = useCallback(() => {
    setIsEditing(true)
  }, [])

  const onDeletePress = useCallback(() => {
    removeTodo(id)
  }, [id, removeTodo])

  const onSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      updateTodo({ id, title: e.nativeEvent.text, completed })
      setIsEditing(false)
    },
    [completed, id, updateTodo],
  )

  const onBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.container}>
      {isEditing ? (
        <TextInput
          defaultValue={title}
          onSubmitEditing={onSubmitEditing}
          autoFocus
          selectTextOnFocus
          onBlur={onBlur}
        />
      ) : (
        <Text style={completed && styles.completed}>{title}</Text>
      )}

      <TouchableOpacity onPress={onDeletePress}>
        <Text>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    marginBottom: spacing.s,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  completed: {
    textDecorationLine: "line-through",
  },
})
