import AsyncStorage from "@react-native-async-storage/async-storage"
import { randomUUID } from "expo-crypto"

export const STORAGE_KEY = "todos"

/**
 * Todo interface that uses AsyncStorage as a fake API
 */
class Api {
  getTodos = async () => {
    const todos = await AsyncStorage.getItem(STORAGE_KEY)
    if (!todos) return []

    try {
      return JSON.parse(todos) as ITodo[]
    } catch {
      return []
    }
  }

  addTodo = async (title: string) => {
    const id = randomUUID()
    const todo = {
      id,
      title,
    }

    const todos = await this.getTodos()
    todos.unshift(todo)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))

    return id
  }

  removeTodoById = async (id: string) => {
    const todos = await this.getTodos()
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) return

    todos.splice(index, 1)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }

  updateTodoById = async ({ id, title, completed }: ITodo) => {
    const todos = await this.getTodos()
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) return

    todos[index] = { ...todos[index], title, completed }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export const api = new Api()
