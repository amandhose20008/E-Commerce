<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Product Image -->
        <div class="flex justify-center">
          <img :src="product.image" alt="Product" class="h-64 w-auto object-contain">
        </div>
        
        <!-- Product Details -->
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600 text-lg mt-2">{{ product.description }}</p>
          <p class="text-gray-800 text-xl font-semibold mt-4">${{ product.price }}</p>

          <!-- Add to Cart Button -->
          <button @click="addToCart(product)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ProductService } from '@/services/Admin/Products/index.service'
import { watch } from 'vue'

const product = ref([])
const props = defineProps({
  productId: Number,
  fetchList: Function
})

const viewProductDetails = async () => {
  try {
    const id = props.productId
    const response = await ProductService.productViewDetailsService(id)
    console.log('bghjhjh', response.data)
    product.value = response.data
    // props.fetchList()
    console.log('jbgsdfg', product.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  viewProductDetails(props.productId)
})

watch(
  () => props.productId,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      viewProductDetails(newValue)
    }
  }
)
</script>
