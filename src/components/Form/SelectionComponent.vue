<template>
  <div>
    <label-component :text="label" />
    <div>
      <div v-for="(val, i) of values" :key="i">
        <field
          :name="name"
          :type="inputType"
          :value="val"
          @blur="validate"
          @change="validate"
        />
        {{ val }}
      </div>
    </div>
    <error-message :message="errorMessage" />
  </div>
</template>

<script setup>
import LabelComponent from "./LabelComponent.vue";
import ErrorMessage from "./ErrorMessage.vue";
import { Field, useField } from 'vee-validate'

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
    default: 'checkbox',
    required: false
  },
  values: {
    type: Array,
    required: true
  }
})

const { errorMessage, validate } = useField(props.name, props.schema, {
  type: props.inputType
})
</script>