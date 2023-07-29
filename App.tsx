import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SafeAreaView, StyleSheet } from "react-native"
import "react-native-get-random-values"
import { TodoList } from "./src/components/TodoList"
import { colors } from "./src/constants/style"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <TodoList />
      </SafeAreaView>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
