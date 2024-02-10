<template>
  <p
    v-if="message"
    class="text-red-500 text-xs italic mt-2"
  >
    {{ message }}
  </p>
</template>

<script setup>
defineProps({
  message: {
    type: [String, Boolean],
    default: false,
    required: false
  }
})

</script>