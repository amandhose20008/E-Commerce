
<template>
  <header class="site-header">
    <a to="/">
      <div class="site-logo">
        <span>Demo</span>
      </div>
    </a>

    <nav class="site-nav">
      <ul class="site-nav__list">
        <li class="site-nav__item">
      <Badge :count="cartLength.length">
        <ShoppingCartOutlined width="1em" height="1em" @click="props.show" />
      </Badge>
        </li>
        <li class="site-nav__item">
          <Button @click="logout">Logout</Button>
        </li>
        <button @click="navigate">NAvigate</button>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Button } from "ant-design-vue"
import { Badge } from 'ant-design-vue';
import stores from '@/stores'
import {  ShoppingCartOutlined  } from '@ant-design/icons-vue';

const props = defineProps({
  show:Boolean
})

const navigate = () =>{
  router.push({name:'auth.login'})
}
// Access the router instance
const router = useRouter()
const cartLength = stores.getters['product/getCartList']  
console.log("*****",cartLength)

// Method to navigate to the Add Tag route
const logout = () => {
  router.push('/login')
  console.log('check routing',router.push({ name: 'auth.login' }))
  localStorage.clear()
}

// Method to navigate to the Tag List route
const profile = () => {
  router.push('/profile')
}


</script>

<style scoped>
/* .site-header */
.site-header {
  position: relative;
  top: 4rem;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  max-width: 72rem; /* equivalent to max-w-6xl */
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem; /* equivalent to rounded-2xl */
  border: 1px solid #cbd5e0; /* equivalent to border border-slate-200 */
  background-color: #fff; /* equivalent to bg-white */
  padding: 1rem; /* equivalent to p-4 */

  /* For extra large screens */
  margin-left: auto; /* equivalent to xl:mx-auto */
  margin-right: auto; /* equivalent to xl:mx-auto */
}

/* .site-logo > span */
.site-logo > span {
  font-family: sans-serif; /* Assuming font-heading is a sans-serif font */
  font-size: 1.125rem; /* equivalent to text-lg */
  font-weight: 800; /* equivalent to font-extrabold */
  color: #1f2937; /* equivalent to text-slate-900 */
}

/* .site-nav__list */
.site-nav__list {
  display: flex;
  gap: 1.5rem; /* equivalent to gap-6 */
}

/* .site-section */
.site-section {
  margin-left: auto;
  margin-right: auto;
  max-width: 87.5rem; /* equivalent to max-w-7xl */
  padding: 1rem; /* equivalent to p-4 */
  padding-top: 4rem; /* equivalent to py-16 */
}

/* .site-section > h1 */
.site-section > h1 {
  font-family: sans-serif; /* Assuming font-heading is a sans-serif font */
  font-size: 2.25rem; /* equivalent to text-4xl */
  font-weight: 800; /* equivalent to font-extrabold */
  color: #1f2937; /* equivalent to text-slate-900 */
}
</style>
