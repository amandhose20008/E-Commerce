<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h2 class="text-2xl font-semibold mb-4">OTP Verification</h2>
      <p class="text-gray-600 mb-6">Please enter the OTP sent to your mobile number.</p>
      <v-form :validation-schema="validationSchema" @submit="verifyOTP" class="space-y-4">
        <!-- Email input field -->
        <div>
          <TextInputVue label="otp" type="number" name="otp" required />
        </div>
        <!-- Submit button -->
        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Verify OTP
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { Form as VForm } from 'vee-validate'
import * as yup from 'yup'
import TextInputVue from '@/components/Antd/TextInput.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { AdminAuthServices } from '@/services/Admin/Auth/index.service'

const { t } = useI18n()
const router = useRouter()

const validationSchema = yup.object({
  otp: yup.string().required('otp is required!').max(50, 'Must be maximum 50 characters!')
})
const email = localStorage.getItem('email')

const verifyOTP = async (values) => {
  try {
    const bodyData = { ...values, email: email }
    const response = await AdminAuthServices.OtpVerificationService(bodyData)
    const { status } = response
    if (status === true) {
      alert('email verified successfully')
      router.push('/')
    }
  } catch (error) {
    // Handle error
    console.error(error)
  }
}
</script>

<style>
/* You can add additional styles here if needed */
</style>
