<script setup lang="ts">
const { search } = useExpenses()

const navLinks = [
  {
    label: "Recent Expenses",
    to: "/recent-expenses"
  },
  {
    label: "Add Expense",
    to: "/add-expense"
  }
]
</script>


<template>
  <header class="bg-white border-b shadow-sm">
    <div
      class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
    >
      
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl"
        >
          💰
        </div>

        <div>
          <h1 class="text-lg font-bold">
            Expense Tracker
          </h1>

          <p class="text-xs text-gray-500">
            Manage Your Money
          </p>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-2">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
          active-class="bg-emerald-100 text-emerald-700"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden md:block w-80">
        <input
        v-model="search"
          type="text"
          placeholder="Search expenses..."
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
      </div>

      

      
      <button
        class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        🌙
      </button>
    </div>

    <nav class="md:hidden px-6 pb-4 flex gap-2 overflow-x-auto">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 transition"
        active-class="bg-emerald-100 text-emerald-700"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
