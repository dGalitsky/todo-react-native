import React, { useCallback, useState } from "react"
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native"
import { spacing } from "../constants/style"
import { useTodosQuery } from "../hooks/useTodosQuery"
import { AddTodo } from "./AddTodo"
import { EFilter, Filter } from "./Filter"
import { Todo } from "./Todo"

export const TodoList = () => {
  const { todos, addTodo } = useTodosQuery()
  const [filter, setFilter] = useState<EFilter>(EFilter.All)

  const onFilterChange = (filter: EFilter) => {
    setFilter(filter)
  }

  const renderTodo: ListRenderItem<ITodo> = useCallback(
    ({ item }) => {
      switch (filter) {
        case EFilter.All:
          return <Todo {...item} />
        case EFilter.Active:
          return !item.completed ? <Todo {...item} /> : null
        case EFilter.Completed:
          return item.completed ? <Todo {...item} /> : null
      }
    },
    [filter],
  )

  return (
    <View style={styles.container}>
      <AddTodo onSubmit={addTodo} />
      <Filter filter={filter} onChange={onFilterChange} />
      <FlatList data={todos} renderItem={renderTodo} keyExtractor={(item) => item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
})
