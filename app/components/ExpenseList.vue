<script setup lang="ts">
import { useExpenses } from "~/composables/useExpenses"

const { filteredExpenses, deleteExpense } = useExpenses()

const sortBy = ref("date-newest")

const sortedExpenses = computed(() => {
  return [...filteredExpenses.value].sort((firstExpense, secondExpense) => {
    switch (sortBy.value) {
      case "date-oldest":
        return firstExpense.date.localeCompare(secondExpense.date)
      case "amount-high":
        return secondExpense.amount - firstExpense.amount
      case "amount-low":
        return firstExpense.amount - secondExpense.amount
      case "date-newest":
      default:
        return secondExpense.date.localeCompare(firstExpense.date)
    }
  })
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(amount)
}
</script>

<template>
  <div class="bg-white rounded-2xl border shadow-sm p-6">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold">
        Recent Expenses
      </h2>

      <label class="flex items-center gap-2 text-sm font-medium text-gray-600">
        Sort by
        <select
          v-model="sortBy"
          class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        >
          <option value="date-newest">Date: Newest first</option>
          <option value="date-oldest">Date: Oldest first</option>
          <option value="amount-high">Amount: High to low</option>
          <option value="amount-low">Amount: Low to high</option>
        </select>
      </label>
    </div>

    <div
      v-if="sortedExpenses.length === 0"
      class="text-center text-gray-500 py-10"
    >
      No matching expenses found.
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <div
        v-for="expense in sortedExpenses"
        :key="expense.id"
        class="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
      >
        <div>
          <h3 class="font-semibold">
            {{ expense.title }}
          </h3>

          <div class="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <CategoryBadge :category="expense.category" />
            <span>{{ expense.date }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="font-bold text-red-500">
            {{ formatCurrency(expense.amount) }}
          </span>

          <button
            @click="deleteExpense(expense.id)"
            class="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
      


        </div>
      </div>
    </div>
  </div>
</template>


