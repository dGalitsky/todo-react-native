import { AnimatePresence } from "moti"
import React, { useCallback, useRef, useState } from "react"
import { FlatList, ListRenderItem, StyleSheet, TextInput, View } from "react-native"
import { spacing } from "../constants/style"
import { useTodosQuery } from "../hooks/useTodosQuery"
import { AddTodoBtn } from "./AddTodoBtn"
import { EFilter, Filter } from "./Filter"
import { NewTodoInput } from "./NewTodoInput"
import { Todo } from "./Todo"
import { Empty } from "./Empty"

export const TodoList = () => {
  const { todos, addTodo } = useTodosQuery()
  const [filter, setFilter] = useState<EFilter>(EFilter.All)
  const [isAdding, setIsAdding] = useState(false)
  const addTodoRef = useRef<TextInput>(null)

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

  const onSubmitTodo = useCallback(
    (value: string) => {
      addTodo(value)
      setIsAdding(false)
      addTodoRef.current?.clear()
    },
    [addTodo],
  )

  const onAddTodoBlur = useCallback(() => {
    addTodoRef.current?.clear()
    setIsAdding(false)
  }, [])

  return (
    <View style={styles.container}>
      {todos?.length ? <Filter filter={filter} onChange={onFilterChange} /> : null}

      <AnimatePresence>
        {isAdding && (
          <NewTodoInput ref={addTodoRef} onSubmit={onSubmitTodo} onBlur={onAddTodoBlur} />
        )}
      </AnimatePresence>

      {todos?.length ? (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <Empty />
      )}

      <AddTodoBtn
        onPress={() => {
          setIsAdding(true)
          setTimeout(() => {
            addTodoRef.current?.focus()
          }, 300)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  list: {
    overflow: "visible",
  },
})
