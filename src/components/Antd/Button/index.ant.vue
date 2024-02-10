<template>
    <a-button v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </a-button>
  </template>
  
  <script setup>
  import { Button as AntButton } from 'ant-design-vue';
  
  // Exporting the component name to make it accessible in the template
  const name = 'CommonButton';
  
  // Importing Ant Design Vue Button component as 'a-button' alias
  const aButton = AntButton;
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  