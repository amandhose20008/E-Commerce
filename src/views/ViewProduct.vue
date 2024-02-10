<template>
    <div>
    <div>
      <p>{{ product.productName }}</p>
      <p>Price: {{ product.price }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Quantity: {{ product.quantity }}</p>
        <img :src="product.image" alt="Product Image">
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { ProductService } from '@/services/Admin/Products/index.service';
  
  const product = ref([]);
  const props = defineProps({
  productId: Number,
  fetchList:Function
});

  
  const viewProductDetails = async () => {
    try {
      const id = props.productId
      const response = await ProductService.productViewDetailsService(id)
      console.log("bghjhjh",response.data)
      product.value = response.data;
      props.fetchList()
      console.log("jbgsdfg",product.value)
    } catch (err) {
        console.log(err)
    } 
  };

  onMounted(viewProductDetails)
  </script>
  