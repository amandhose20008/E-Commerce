<template>
    <Breadcrumb>
      <!-- Mapping over the breadcrumb items -->
      <Breadcrumb.Item v-for="(item, index) in breadcrmb" :key="index">
        <!-- Using Vue Router's router-link for navigation -->
        <router-link :to="item.path">{{ item.name }}</router-link>
      </Breadcrumb.Item>
    </Breadcrumb>
  </template>
  
  <script setup>
  // Importing necessary components from Vue Router
  import { Breadcrumb } from "ant-design-vue";
  import { defineProps } from 'vue';
  
  // Define props
  const props = defineProps({
    breadcrmb: Array
  });
  </script>
  