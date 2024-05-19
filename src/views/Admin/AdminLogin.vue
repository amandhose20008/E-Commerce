<script setup>
// import Button from '@/components/Antd/Button/index.ant.vue'
import { Form as VForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { AdminAuthServices } from '@/services/Admin/Auth/index.service'
import { useI18n } from 'vue-i18n'
import stores from '@/stores'
import TextInput from '@/components/Antd/TextInput.vue'
import PasswordInput from '@/components/Antd/PasswordInput.vue'
import moduleRoutesMap from '@/routeControl'

const router = useRouter()
const { t } = useI18n()

// Define validation schema for the login form
const validationSchema = yup.object({
  email: yup.string().required('Email is required!'),
  password: yup.string().required('Password is required!')
})

const loginUser = async (values) => {
  try {
    const response = await AdminAuthServices.userLogin(values)
    // Handle success
    const { data, access_token } = response
    stores.dispatch('auth/loginUser', { data: data, token: access_token })
    localStorage.setItem('auth', response.access_token)
    setTimeout(() => { 
      router.push(moduleRoutesMap.admin.HOME) 
    }, 1000) 
  } catch (error) {
    // Handle error
    console.error(error)
  }
}
</script>
 
<template>
  <!-- Login Form Section -->
  <div
    class="grid grid-cols-1 md:grid-cols-none md:flex md:flex-row md:items-center md:justify-center h-screen"
  >
    <!-- Image Column -->
    <div class="image-col md:w-1/2 h-screen overflow-hidden">
      <!-- Back Button -->
      <button
        @click="navigateToHome"
        class="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>
      <!-- Image Container -->
      <div class="image-container h-full flex items-center">
        <img
          src="https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_868/f_auto,q_auto/v1649725962/Web_Assets/blog/GlsMskOvrly_VueJS_223970644e/GlsMskOvrly_VueJS_223970644e-png?_i=AA"
          alt="Side_Image"
          class="side-image object-cover h-full w-auto"
        />
      </div>
    </div>

    <!-- Form Column -->
    <div class="form-col md:w-1/2 overflow-auto">
      <!-- Login Form Content -->
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <!-- Company Logo -->
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <!-- Title -->
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {{ t('loginTitle') }}
          </h2>
        </div>

        <!-- Login Form -->
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <v-form :validation-schema="validationSchema" @submit="loginUser" class="space-y-6">
            <!-- Username Input -->
            <div>
              <TextInput :label="t('emailLabel')" type="email" name="email" required />
            </div>

            <!-- Password Input -->
            <div>
              <PasswordInput :label="t('passwordLabel')" type="password" name="password" required />
            </div>
            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font float-end my-2 text-indigo-600 hover:text-indigo-500"
                >{{ t('forgotPassword') }}</router-link
              >
            </div>
            <div class="text-center mt-4">
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {{ t('loginForm.submitButton') }}
              </button>
            </div>
          </v-form>
          <!-- Signup Link -->
          <p>
            {{ t('DontHaveAnAccount') }}
            <router-link
              to="/signup"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {{ t('register') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style lang="scss">
.container {
  // height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    max-width: 450px;

    .card-body {
      .card-title {
        text-align: center;
        color: #888;
        margin-top: 1.5rem;
      }

      form {
        .mb-3 {
          margin-bottom: 1rem;
          label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
          }
          input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            transition: border-color 0.3s;
            &:focus {
              border-color: #5cb3fd;
            }
          }
        }

        .text-center {
          margin-top: 1.5rem;
          button {
            padding: 0.75rem 1.5rem;
            background-color: #5cb3fd;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            &:hover {
              background-color: #4a90e2;
            }
          }
        }
      }
    }
  }
}
</style> -->
