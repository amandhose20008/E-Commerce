<template>
    <a-popconfirm
      title="Are you sure to delete this task?"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      :ok-text="okText"
      :cancel-text="cancelText"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </a-popconfirm>
  </template>
  
  <script setup>
  import { Popconfirm as APopconfirm } from 'ant-design-vue';
  
  // Define props
  const { onConfirm, okText = 'Yes', cancelText = 'No', ...rest } = props;
  

  
  // Handle confirmation
  const handleConfirm = () => {
    onConfirm();
  };
  
  // Placeholder function for cancel action
  const handleCancel = () => {};
  </script>
  