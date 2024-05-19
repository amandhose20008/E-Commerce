<template>
    <!-- Container for the forgot password form -->
    <div
      class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center h-screen"
    >
      <!-- Column for the image -->
      <div class="image-col md:w-1/2 h-screen overflow-hidden">
        <button
          @click="navigateToHome"
          class="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <div class="image-container h-full flex items-center">
          <!-- Image for the side -->
          <img
            src="https://www.officialgates.com/assets/images/banner-images/og_vue.png"
            alt="Side_Image"
            class="side-image object-cover h-full w-auto"
          />
        </div>
      </div>
  
      <!-- Column for the form -->
      <div class="form-col md:w-1/2 overflow-auto">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- Company logo -->
            <img
              class="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <!-- Title for the forgot password form -->
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {{ t('forgotPasswordTittle') }}
              <!-- Display forgot password title -->
            </h2>
          </div>
  
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- Forgot password form -->
            <v-form :validation-schema="validationSchema" @submit="onSubmit" class="space-y-4">
              <!-- Email input field -->
              <div>
                <TextInput :label="t('emailLabel')" type="email" name="email" required />
              </div>
              <!-- Submit button -->
              <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ t('loginForm.submitButton') }}</button>              </div>
            </v-form>
  
            <!-- Link to login page -->
            <p class="mt-10 text-center text-sm text-gray-500">
              {{ t('alreadyHaveAnAccount') }}
              <!-- Display text for existing account -->
              <router-link
                to="/"
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {{ t('login') }}
                <!-- Display text for login link -->
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Form as VForm } from 'vee-validate'
  import * as yup from 'yup' // Import yup for validation
  import { useI18n } from 'vue-i18n' // Import useI18n for translation
  import { AdminAuthServices } from '@/services/Admin/Auth/index.service';
  import  TextInput  from '@/components/Antd/TextInput.vue';
import router from '@/router';
  
  const { t } = useI18n() // Define translation function
  
  // Define validation schema for the forgot password form
  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Email is required!')
      .email('Email is invalid!')
      .max(50, 'Must be maximum 50 characters!')
  })
  
  // Function to handle form submission
  const onSubmit = async (values) => {
    console.log("checkk",values)
    try {
      const response = await AdminAuthServices.forgotPassword(values)
      const { message, status } = response;
      if (status) {
      alert(message)
        // Navigate to the dashboard
        router.push('/login')
      }
    } catch (error) {
    console.log(error)
    }
  }
  
  // // Function to navigate to home page
  const navigateToHome = () => {
    router.push('/login')
  }
  </script>
  