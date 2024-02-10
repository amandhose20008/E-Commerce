<template>
    <Table v-bind="$attrs" v-on="$listeners">
       <slot></slot>
    </Table>
  </template>
  
  <script setup>
  import { Table } from 'ant-design-vue';
  

  </script>