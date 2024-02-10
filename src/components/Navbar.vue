<template>
    <!-- Menu component for navigation -->
    <a-menu 
      mode="horizontal"
      theme="dark"
      :style="{ lineHeight: '64px' }"
    >
      <!-- Menu items -->
      <a-menu-item @click="addItem">Add Tag</a-menu-item>
      <a-menu-item @click="tagList">Tag List</a-menu-item>
      <a-menu-item @click="home">Home</a-menu-item>
    </a-menu>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  // Access the router instance
  const router = useRouter();
  
  // Method to navigate to the Add Tag route
  const addItem = () => {
    router.push('/addtag');
    console.log('Add Item clicked');  
  };
  
  // Method to navigate to the Tag List route
  const tagList = () => {
    router.push('/tags');
    console.log('Tag List clicked');
  };
  
  // Method to navigate to the Home route
  const home = () => {
    router.push('/home');
    console.log('Home clicked');
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  