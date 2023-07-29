import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { TodoList } from "./src/components/TodoList"
import { colors, spacing } from "./src/constants/style"

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
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + spacing.m : 0,
  },
})
