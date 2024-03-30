<template>
  <!-- Main layout wrapper -->
  <a-layout v-if="authenticated" style="min-height: 100vh">
    <!-- Sidebar -->
    <AdminSideBarVue #content>

    <!-- Main content layout -->
    <a-layout>
      <!-- Header -->
      <NavbarVue />

      

      <a-layout style="margin: 16px 0">
        <!-- Content -->
        <a-layout-content style="margin: 0 16px">
          <!-- Content area -->
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <!-- Router view for dynamic content -->
            <router-view />
          </div>
        </a-layout-content>

        <!-- Footer -->
        <AppFooter />
      </a-layout>
    </a-layout>
  </AdminSideBarVue>
  </a-layout>
  <div v-else>
    <!-- Render a message or redirect to login if not authenticated -->
    <p>Please log in to access this page.</p>
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
import moduleRoutesMap from '@/routeControl'
import AdminSideBarVue from '@/components/AdminSideBar.vue'


const authenticated = ref(false)
const show = ref(false)
const isAdmin = ref(false) // Add a ref for admin status
const router = useRouter()
const route = useRoute()


onMounted(() => {
const isAuthenticated = stores.state.auth.authToken

authenticated.value = isAuthenticated

if (!isAuthenticated) {
  router.push(moduleRoutesMap.admin.LOGIN)
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
