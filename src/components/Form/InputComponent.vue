<template>
  <label-component :for="name" :text="label" />
  <input
    :id="name"
    v-model="value"
    :type="inputType"
    @blur="validate"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
  <error-message :message="errorMessage" />
</template>

<script setup>
import { useField } from 'vee-validate'
import LabelComponent from './LabelComponent.vue'
import ErrorMessage from './ErrorMessage.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: [String, Boolean],
    default: false,
    required: false
  },
  schema: {
    type: Object,
    required: true
  },
  inputType: {
    type: String,
    default: 'text',
    required: false
  }
})

const { value, errorMessage, handleChange, validate } = useField(props.name, props.schema, {
  validateOnValueUpdate: false
})
</script>
