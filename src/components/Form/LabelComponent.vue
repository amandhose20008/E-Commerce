<template>
  <label
    v-if="text"
    class="block text-gray-700 text-sm font-bold mb-2 mt-4"
    :for="props.for"
  >
    {{ text }}
  </label>
</template>

<script setup>
const props = defineProps({
  for: String,
  text: String
})
</script>