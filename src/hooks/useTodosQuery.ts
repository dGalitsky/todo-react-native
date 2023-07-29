import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"
import { randomUUID } from "expo-crypto"
import { useCallback } from "react"

// Obviously using React Query here is overkill, but it's a good example of how
// to use it with a fake API. Should the API change to use a real backend, the
// only thing that would need to change is the api.ts file. The rest of the app
// would be unaffected. It also handles optimistic updates for us, in case async storage
// is slow to update.

const QUERY_KEY = ["todos"]
const STALE_TIME = 1000 * 60 * 5 // 5 minutes

export const useTodosQuery = () => {
  const queryClient = useQueryClient()

  const { data: todos, ...queryRest } = useQuery(QUERY_KEY, api.getTodos, {
    staleTime: STALE_TIME,
  })

  const onSettled = useCallback(() => {
    queryClient.invalidateQueries(QUERY_KEY)
  }, [queryClient])

  const { mutate: addTodo } = useMutation(api.addTodo, {
    onMutate: async (title) => {
      await queryClient.cancelQueries(QUERY_KEY)
      const previousTodos = queryClient.getQueryData<ITodo[]>(QUERY_KEY)

      // Fake id that will be replaced by a real one once the API call succeeds
      const id = randomUUID()
      const todo = { id, title }

      queryClient.setQueryData<ITodo[]>(QUERY_KEY, (prev) => (prev ? [...prev, todo] : [todo]))
      return { previousTodos }
    },

    // If the mutation fails, roll back to the previous value
    onError: (_err, _title, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTodos)
    },

    // Always refetch after error or success:
    onSettled,
  })

  const { mutate: removeTodo } = useMutation(api.removeTodoById, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(QUERY_KEY)
      const previousTodos = queryClient.getQueryData<ITodo[]>(QUERY_KEY)
      queryClient.setQueryData<ITodo[]>(QUERY_KEY, (prev) =>
        prev ? prev.filter((todo) => todo.id !== id) : [],
      )
      return { previousTodos }
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTodos)
    },
    onSettled,
  })

  const { mutate: updateTodo } = useMutation(api.updateTodoById, {
    onMutate: async ({ id, title, completed }) => {
      await queryClient.cancelQueries(QUERY_KEY)
      const previousTodos = queryClient.getQueryData<ITodo[]>(QUERY_KEY)
      queryClient.setQueryData<ITodo[]>(QUERY_KEY, (prev) =>
        prev ? prev.map((todo) => (todo.id === id ? { ...todo, title, completed } : todo)) : [],
      )
      return { previousTodos }
    },
    onError: (_err, _args, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousTodos)
    },
    onSettled,
  })

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    ...queryRest,
  }
}
