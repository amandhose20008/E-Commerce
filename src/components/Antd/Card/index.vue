<template>
  <a-card v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a-card>
</template>

<script setup>
import { Card as AntCard } from 'ant-design-vue';

// Destructuring props
const { children, ...rest } = props;

// Exporting the component name to make it accessible in the template
const name = 'Card';
</script>

<!-- No scoped styles needed as Ant Design Vue handles the styling -->
