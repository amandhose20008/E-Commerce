<script setup>
// import { Button } from '@/components/Antd/index.vue';
import Button from "@/components/Antd/Button/index.ant.vue"
import AdminFooter from "@/components/AdminFooter/index.vue"
import InputComponent from '@/components/Form/InputComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import {AdminAuthServices} from "@/services/Admin/Auth/index.service"
import { useI18n } from "vue-i18n";
import stores from "@/stores";


const router = useRouter();
const { t } = useI18n();
    const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
    const profile = ref({
      email: "",
      password: "",
    });
    const loginUser = async () => {
      try {
        const response = await AdminAuthServices.userLogin({
            email:profile.value.email,
            password: profile.value.password,
            // userRole: "admin",
            // deviceType: "web",
            // appVersion: "v1",
            // firebaseToken: "",
          })
        

        // Handle success
        console.log('>>>>',response);
        const { data } = response;
        console.log(">>>",data) 

        stores.dispatch('auth/loginUser',{ data: data.data, token:data.access_token})

        localStorage.setItem("auth", response.access_token);

        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } catch (error) {
        // Handle error
        console.error(error.response.data.message);
      }
    }

</script>

<template>
<div class="container">
    <div class="row d-flex justify-content-center align-items-center" style="height: 100vh">
      <div class="card mb-3" style="max-width: 450px">
        <div class="col-md-12">
          <div class="card-body">
            <h3 class="card-title text-center text-secondary mt-3">{{ t('loginForm.title') }}</h3>
            <form @submit.prevent="loginUser">
              <div class="mb-3 mt-4">
                <label>{{ t('loginForm.emailLabel') }}:</label>
                <input
                  class="form-control shadow-none"
                  v-model="profile.email"
                  type="email"
                />
                <!-- <InputComponent  name="email" label="Email" :schema="schema" inputType="email"/> -->
              </div>
              <div class="mb-3">
                <label>{{ t('loginForm.passwordLabel') }}:</label>
                <input
                  type="password"
                  v-model="profile.password"
                />
                <!-- <InputComponent name="password" label="Password" :schema="schema" inputType="password"/> -->
              </div>
              <div class="text-center mt-4">
                <button type="submit">{{ t('loginForm.submitButton') }}</button>
                <AdminFooter/>
              

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  height: 100vh;
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
</style>
