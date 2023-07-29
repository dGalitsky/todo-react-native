import * as Haptics from "expo-haptics"
import React, { useCallback, useState } from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from "react-native"
import { borderRadius, colors, spacing } from "../constants/style"
import { useTodosQuery } from "../hooks/useTodosQuery"

export const Todo = ({ id, title, completed }: ITodo) => {
  const [isEditing, setIsEditing] = useState(false)
  const { updateTodo, removeTodo } = useTodosQuery()

  const onPress = useCallback(() => {
    updateTodo({ id, title, completed: !completed })
  }, [updateTodo, id, title, completed])

  const onLongPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
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
          style={styles.text}
        />
      ) : (
        <Text style={[styles.text, completed && styles.completed]}>{title}</Text>
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
    backgroundColor: colors.secondary,
    borderRadius,

    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  completed: {
    textDecorationLine: "line-through",
  },
  text: {
    color: colors.text,
  },
})
