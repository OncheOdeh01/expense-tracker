<script setup lang="ts">
import { computed, ref } from "vue"
import { useExpenses } from "~/composables/useExpenses"

const message = ref("")
const { addExpense } = useExpenses()
const messageType = ref<"success" | "error" | "">("")

const title = ref("")
const amount = ref<number | null>(null)
const category = ref("Food")
const date = ref(new Date().toISOString().slice(0, 10))
const submitted = ref(false)

type FieldName = "title" | "amount" | "category" | "date"

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Others"
]

const errors = computed<Record<FieldName, string>>(() => {
  const parsedAmount = Number(amount.value)

  return {
    title: title.value.trim() ? "" : "Expense title is required.",
    amount: amount.value !== null && Number.isFinite(parsedAmount) && parsedAmount > 0
      ? ""
      : "Amount must be greater than 0.",
    category: category.value ? "" : "Category is required.",
    date: date.value ? "" : "Date is required."
  }
})

const isValid = computed(() => Object.values(errors.value).every((error) => !error))

const showError = (field: FieldName) => submitted.value && Boolean(errors.value[field])

const inputClass = (field: FieldName) => [
  "w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2",
  showError(field)
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-100"
]

const resetForm = () => {
  title.value = ""
  amount.value = null
  category.value = "Food"
  date.value = new Date().toISOString().slice(0, 10)
  submitted.value = false
}

const submit = () => {
  submitted.value = true

  if (!isValid.value) {
    message.value = "Please correct the highlighted fields."
    messageType.value = "error"
    return
  }

  addExpense({
    title: title.value.trim(),
    amount: Number(amount.value),
    category: category.value,
    date: date.value
  })

  message.value = "Expense added successfully!"
  messageType.value = "success"

  resetForm()
}
</script>

<template>
  <div class="bg-white rounded-2xl border shadow-sm p-6">
    <h2 class="text-xl font-semibold mb-4">
      Add Expense
    </h2>

    <form @submit.prevent="submit" class="space-y-4" novalidate>
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="Expense title"
          required
          :aria-invalid="showError('title')"
          aria-describedby="title-error"
          :class="inputClass('title')"
        >

        <p
          v-if="showError('title')"
          id="title-error"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.title }}
        </p>
      </div>

      <div>
        <input
          v-model.number="amount"
          type="number"
          placeholder="Amount"
          required
          min="1"
          step="0.01"
          :aria-invalid="showError('amount')"
          aria-describedby="amount-error"
          :class="inputClass('amount')"
        >

        <p
          v-if="showError('amount')"
          id="amount-error"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.amount }}
        </p>
      </div>

      <div>
        <select
          v-model="category"
          required
          :aria-invalid="showError('category')"
          aria-describedby="category-error"
          :class="inputClass('category')"
        >
          <option
            v-for="item in categories"
            :key="item"
          >
            {{ item }}
          </option>
        </select>

        <p
          v-if="showError('category')"
          id="category-error"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.category }}
        </p>
      </div>

      <div>
        <input
          v-model="date"
          type="date"
          required
          :aria-invalid="showError('date')"
          aria-describedby="date-error"
          :class="inputClass('date')"
        >

        <p
          v-if="showError('date')"
          id="date-error"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.date }}
        </p>
      </div>

      <p
         v-if="message"
          class="text-center text-sm mt-3"
          :class="messageType === 'success'
         ? 'text-emerald-600'
          : 'text-red-600'"
          >
         {{ message }}
      </p>

      <button
        type="submit"
        class="w-full rounded-lg bg-emerald-600 py-3 text-white transition hover:bg-emerald-700"
      >
        Add Expense
      </button>
    </form>
  </div>
</template>

