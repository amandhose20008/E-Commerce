<template>
    <a-content v-bind="$attrs">
      <slot></slot>
    </a-content>
  </template>
  
  <script setup>
  import { Layout as AntLayout } from 'ant-design-vue';
   
  // Extracting Content component from Ant Design Vue Layout
  const { Content: AContent } = AntLayout;
  

  </script>
  