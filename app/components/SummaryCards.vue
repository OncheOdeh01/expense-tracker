<script setup lang="ts">
import { useExpenses } from "~/composables/useExpenses"

const {
  budget,
  totalSpent,
  remaining,
  transactionCount
} = useExpenses()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(value)
}
</script>


<template>
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
            name="Budget"
            :amount="formatCurrency(budget)"
        />

        <SummaryCard
            name="Spent"
            :amount="formatCurrency(totalSpent)"
        />

        <SummaryCard
            name="Remaining"
            :amount="formatCurrency(remaining)"
        />

        <SummaryCard
            name="Transactions"
            :amount="transactionCount"
        />

    </section>
</template>

