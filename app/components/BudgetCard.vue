<script setup lang="ts">
import { computed } from "vue"
import { useExpenses } from "~/composables/useExpenses"

const {
  budget,
  totalSpent,
  percentage
} = useExpenses()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(value)
}

const progressColor = computed(() => {
  if (percentage.value < 50) return "bg-emerald-500"
  if (percentage.value < 80) return "bg-yellow-500"
  return "bg-red-500"
})
</script>

<template>
  <div class="bg-white rounded-2xl border shadow-sm p-6">

    <div class="flex justify-between mb-2">
      <span class="font-semibold">Monthly Budget</span>
      <span>{{ percentage }}%</span>
    </div>

    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        class="h-full transition-all duration-500"
        :class="progressColor"
        :style="{ width: percentage + '%' }"
      />
    </div>

    <div class="mt-5 text-sm text-gray-500">
      {{ formatCurrency(totalSpent) }}
      of
      {{ formatCurrency(budget) }}
      spent
    </div>

  </div>
</template>
