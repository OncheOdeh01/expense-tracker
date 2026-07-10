<script setup lang="ts">
import { computed } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

import { useExpenses } from "~/composables/useExpenses"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

const { expenses } = useExpenses()

const chartData = computed(() => {
  const totals: Record<string, number> = {}
  
expenses.value.forEach((expense) => {
  totals[expense.category] =
    (totals[expense.category] ?? 0) + expense.amount
})

  return {
    labels: Object.keys(totals),
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(totals),
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#F97316",
          "#6B7280",
        ],
        borderRadius: 8,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}
</script>

<template>
  <div class="bg-white rounded-2xl border shadow-sm p-6">
    <h2 class="text-xl font-semibold mb-6">
      Spending by Category
    </h2>

    <div class="h-80">
      <Bar
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
