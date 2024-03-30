<script setup>
import { AdminAuthServices } from '@/services/Admin/Auth/index.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  phoneNum: '',
  password: '',
  profilePic: null
})

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.profilePic = file
  }
}

// Define signup method
const signup = async () => {
  try {
    const response = await AdminAuthServices.userSignUp(formData.value)
    console.log('>>>>', response)
    if (response.status === true) {
      localStorage.setItem('email',formData.value.email)
     router.push('otp-verify')
      alert('Signup successful! You can now login.')
      // Clear form fields
      formData.value.name = ''
      formData.value.email = ''
      formData.value.phoneNum = ''
      formData.value.password = ''
      formData.value.profilePic = null
    } else {
      alert('Signup failed. Please try again later.')
    }
  } catch (error) {
    console.error('Error signing up:', error)
    alert('Signup failed. Please try again later.')
  }
}
</script>

<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="signup" class="signup-form">
      <input type="text" v-model="formData.name" placeholder="Username" required />
      <input type="email" v-model="formData.email" placeholder="email" required />
      <input
        type="number"
        v-model="formData.phoneNum"
        placeholder="Mobile No."
        pattern="[0-9]{10}"
        required
      />
      <input type="password" v-model="formData.password" placeholder="Password" required />
      <input type="file" @change="onFileChange" name="image" id="image" accept="image/*" />
      <!-- <Upload
        :before-upload="beforeUpload"
        :file-list="fileList"
        multiple
        accept="image/*"
      >
        <a-button icon="upload">Select Image</a-button>
      </Upload> -->

      <button type="submit">Sign up</button>
    </form>
    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<style scoped lang="scss">
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .signup-form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }

    button {
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
