<template>
  <div class="signup-container">
    <h2>ADD PRODUCTS</h2>

    <form @submit.prevent="addProduct" class="signup-form">
      <input type="text" v-model="formData.productName" placeholder="Product Name" required />
      <input type="text" v-model="formData.price" placeholder="Price" required />
      <input type="text" v-model="formData.description" placeholder="Description" required />
      <input type="number" v-model="formData.quantity" placeholder="Quantity" required />
      <input type="file" @change="onFileChange"    />
      <button type="submit">ADD</button>
    </form>
  </div>
</template>

<script setup>
import { ProductService } from '@/services/Admin/Products/index.service'
import { ref } from 'vue'
import { boolean } from 'yup';

const formData = ref({
  productName: '',
  price: '',
  description: '',
  quantity: '',
  image: null
})
const props = defineProps({
  open:Boolean
})
const emit = defineEmits('productAdded')
const onFileChange = (event) => {
const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
  }
};
const addProduct = async () => {
  console.log('fgfd', formData.value)
  try {
    const response = await ProductService.addProductService(formData.value)
    console.log('check res', response)
    // props.open = false
    emit('productAdded',true)
    return response
  } catch (error) {
    console.error('Error adding product:', error)
  }
}
</script>

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
