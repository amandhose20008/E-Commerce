<template>
  <div class="flex">
    <label-component text="Password" for="password"/>
    <input
      id="password"
      type="password"
      v-model="value"
      @blur="handleChange"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    <input
      id="password-confirm"
      type="password"
      v-model="passwordConfirm"
      @blur="validate"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
    />
    <error-message :message="errorMessage"/>
  </div>
</template>

<script setup>
import {useField} from "vee-validate";
import {ref} from 'vue'
import {string} from 'yup'
import ErrorMessage from "./ErrorMessage.vue";
import LabelComponent from "./LabelComponent.vue";

const passwordConfirm = ref('')

const {value, errorMessage, validate, handleChange} =
  useField('password',
    string().required('Please enter a password')
      .min(6, "Must be longer than 5 characters")
      .test({
        name: 'password-match',
        test(value, ctx) {
          if (value !== passwordConfirm.value) {
            return ctx.createError({
              message: 'Password must match'
            })
          }
          return true
        }
      }), {
      validateOnValueUpdate: false
    })

</script>

<style scoped>
.flex {
  max-width: 20rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem
}

.error {
  color: red;
}
</style>