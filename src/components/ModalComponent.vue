<template>
  <Modal v-bind="$attrs" v-on="$listeners" :footer="footerContent">
    <!-- <template #footer>
<slot name="footer"></slot>
    </template> -->
    <slot></slot>
  </Modal>
</template>

<script setup>
import { Modal } from 'ant-design-vue'
import { computed } from 'vue';
const props = defineProps({
  footerContent: [String, Object, Function] // Accepts string, object, or function for custom footer content
})

// If no custom footer content is provided, set the footer to null to hide the default OK and Cancel buttons
const footer = computed(() => {
  return props.footerContent ? props.footerContent : null;
})

// Expose the Ant Design Modal component
// const { Modal } = Modal
</script>
