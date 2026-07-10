<script setup lang="ts">
defineProps<{
   name: string
   amount: string | number
}>()
</script>

<template>
    <div class="rounded-2xl border bg-white p-5 shadow-sm">

        <p class="text-sm text-slate-500">
            {{ name }}
        </p>

        <h2 class="mt-2 text-2xl font-bold text-slate-900">
            {{ amount }}
        </h2>

    </div>
</template>
