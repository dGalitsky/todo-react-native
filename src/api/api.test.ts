import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY, api } from "."
import { randomUUID } from "expo-crypto"

const mockGetItem = AsyncStorage.getItem as jest.Mock
const mockSetItem = AsyncStorage.setItem as jest.Mock

describe("Api", () => {
  beforeEach(() => {
    mockGetItem.mockReset()
    mockSetItem.mockReset()
  })

  it("returns empty array if no todos", async () => {
    mockGetItem.mockResolvedValue(null)
    expect(await api.getTodos()).toEqual([])
  })

  it("adds a todo", async () => {
    const title = "New Todo"
    mockGetItem.mockResolvedValue(JSON.stringify([]))
    const id = await api.addTodo(title)
    expect(mockSetItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{ id, title }]))
  })

  it("removes a todo by id", async () => {
    const id = randomUUID()
    mockGetItem.mockResolvedValue(JSON.stringify([{ id, title: "Existing Todo" }]))
    await api.removeTodoById(id)
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([]))
  })

  it("updates a todo by id", async () => {
    const id = randomUUID()
    const title = "Updated Todo"
    mockGetItem.mockResolvedValue(JSON.stringify([{ id, title: "Existing Todo" }]))
    await api.updateTodoById({ id, title })
    expect(mockSetItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{ id, title }]))
  })
})
