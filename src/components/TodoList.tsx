import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { spacing } from "../constants/style"
import { useTodosQuery } from "../hooks/useTodosQuery"
import { AddTodo } from "./AddTodo"
import { Todo } from "./Todo"

export const TodoList = () => {
  const { todos, addTodo } = useTodosQuery()

  return (
    <View style={styles.container}>
      <AddTodo onSubmit={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => <Todo {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
})
