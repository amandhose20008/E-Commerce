<template>
    <a-layout style="min-height: 100vh">
      <a-layout>
        <a-layout-content style="margin: 16px">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define a reactive variable to track the collapse state
  const collapsed = ref(false);
  
  // Define a method to handle collapse events
  const handleCollapse = (isCollapsed) => {
    collapsed.value = isCollapsed;
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  