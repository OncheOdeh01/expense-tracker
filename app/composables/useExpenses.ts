import type { Expense } from "~/types/expense"
import { ref } from "vue"

export const useExpenses = () => {
  const expenses = useState<Expense[]>("expenses", () => [])
  const budget = useState<number>("budget", () => 300000)
  const search = useState<string>("search", () => "")
  const selectedCategory = useState<string>(
  "selectedCategory",
  () => "All"
)

  onMounted(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      expenses.value = JSON.parse(savedExpenses)
    }

    const savedBudget = localStorage.getItem("budget")
    if (savedBudget) {
      budget.value = Number(savedBudget)
    }
  })

  watch(
    expenses,
    () => {
      localStorage.setItem("expenses", JSON.stringify(expenses.value))
    },
    { deep: true }
  )

  watch(budget, () => {
    localStorage.setItem("budget", budget.value.toString())
  })

  const totalSpent = computed(() =>
    expenses.value.reduce((total, expense) => total + expense.amount, 0)
  )

  const remaining = computed(() => budget.value - totalSpent.value)

  const transactionCount = computed(() => expenses.value.length)

  const filteredExpenses = computed(() => {
    const searchTerm = search.value.trim().toLowerCase()

    if (!searchTerm) return expenses.value

    return expenses.value.filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm) ||
      expense.category.toLowerCase().includes(searchTerm)
    )
  })

  const percentage = computed(() => {
    if (budget.value === 0) return 0
    return Math.round((totalSpent.value / budget.value) * 100)
  })

  const addExpense = (expense: Omit<Expense, "id">) => {
    expenses.value.unshift({
      id: crypto.randomUUID(),
      ...expense,
    })
  }

  const deleteExpense = (id: string) => {
    expenses.value = expenses.value.filter((expense) => expense.id !== id)
  }

  const updateExpense = (updatedExpense: Expense) => {
    const index = expenses.value.findIndex(
      (expense) => expense.id === updatedExpense.id
    )

    if (index !== -1) {
      expenses.value[index] = updatedExpense
    }
  }

  return {
  expenses,
  filteredExpenses,
  budget,
  search,
  totalSpent,
  remaining,
  percentage,
  transactionCount,
  addExpense,
  deleteExpense,
  updateExpense,
 }
}
