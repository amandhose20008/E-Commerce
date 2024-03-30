<template>
    <div v-if="route.meta.sidebar === true">
    <!-- Main layout wrapper -->
    <a-layout v-if="authenticated" style="min-height: 100vh">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main content layout -->
      <a-layout>
        <!-- Header -->
        <NavbarVue :show="cartShow" />

        <div v-if="show">
          <CartVue :cartClose="cartClose" />
        </div>

        <a-layout style="margin: 16px 0">
          <!-- Content -->
          <a-layout-content style="margin: 0 16px">
            <!-- Content area -->
            <div :style="{marginRight:'-9rem', padding: '24px', background: '#fff', minHeight: '360px' }">
            <!-- Router view for dynamic content -->
              <router-view />
            </div>
          </a-layout-content>

          <!-- Footer -->
          <AppFooter />
        </a-layout>
      </a-layout>
    </a-layout>
    <div v-else>
      <!-- Render a message or redirect to login if not authenticated -->
      <p>Please log in to access this page.</p>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import AppFooter from '@/components/Footer.vue'
import NavbarVue from '@/components/Navbar.vue'
import stores from '@/stores'
import CartVue from '@/views/Cart.vue'


const authenticated = ref(false)
const show = ref(false)
const isAdmin = ref(false) // Add a ref for admin status
const router = useRouter()
const route = useRoute()

const cartShow = () => {
  show.value = true
}

const cartClose = () => {
  show.value = false
}

onMounted(() => {
  const isAuthenticated = stores.state.auth.authToken

  authenticated.value = isAuthenticated

  if (!isAuthenticated) {
    router.push(moduleRoutesMap.user.LOGIN)
  } else {
    // Check if the user is an admin
    const userData = stores.state.auth.isAdmin // Assuming you have user data in the store
    isAdmin.value = userData // Adjust this based on your actual user data structure

    // Redirect to admin dashboard if the user is an admin
    if (isAdmin.value) {
      router.push('/home')
    }
  }
})
</script>
