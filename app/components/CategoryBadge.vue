<script setup lang="ts">
const props = defineProps<{
  category: string
}>()

const categoryStyles: Record<string, string> = {
  Food: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Transport: "bg-sky-100 text-sky-700 ring-sky-200",
  Shopping: "bg-pink-100 text-pink-700 ring-pink-200",
  Bills: "bg-amber-100 text-amber-700 ring-amber-200",
  Entertainment: "bg-purple-100 text-purple-700 ring-purple-200",
  Education: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  Health: "bg-rose-100 text-rose-700 ring-rose-200",
  Others: "bg-slate-100 text-slate-700 ring-slate-200"
}

const badgeClass = computed(() => {
  return categoryStyles[props.category] ?? categoryStyles.Others
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
    :class="badgeClass"
  >
    {{ category }}
  </span>
</template>
