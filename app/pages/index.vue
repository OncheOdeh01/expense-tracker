<script setup lang="ts">
</script>

<template>
  <main class="max-w-7xl mx-auto p-6 space-y-6">
    <SummaryCards />

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <ExpenseChart />
      </div>

      <div>
        <BudgetCard />
      </div>
    </section>
  </main>
</template>
