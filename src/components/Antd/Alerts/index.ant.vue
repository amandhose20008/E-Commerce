<template>
    <div></div>
  </template>
  
  <script setup>
  // Import the notification component from the ant-design-vue library
  import { notification } from "ant-design-vue";
  
  // Destructure props
  const { title, type } = props;
  
  // Display notification based on the 'type' prop
  if (type === "error") {
    // Display an error notification if the 'type' is 'error'
    notification.error({ message: title });
  } else {
    // Display a success notification if the 'type' is not 'error'
    notification.success({ message: title });
  }
  </script>
  