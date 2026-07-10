<template>
  <main class="max-w-3xl mx-auto p-6 space-y-6">
    <NuxtLink
      to="/"
      class="inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
    >
      Back to Dashboard
    </NuxtLink>

    <SummaryCards />
    <ExpenseForm />
  </main>
</template>
