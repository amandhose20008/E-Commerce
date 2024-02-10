<template>
    <a-card v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </a-card>
  </template>
  
  <script setup>
  import { Card } from 'ant-design-vue';
  
  // Expose the Ant Design Card component
  const { Card } = Card;
  </script>