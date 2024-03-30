import UserLayoutVue from '@/Layout/User/UserLayout.vue'
import privateRoutes from './private.route'
import publicRoutes from './public.route'
import AdminLayoutVue from '@/Layout/Admin/AdminLayout.vue'

/**
 * Generates an array of route objects for the user section, including public and private layouts.
 * @param {function} t - Translation function (if used for internationalization).
 * @returns {Array} An array containing route objects for both public and private layouts.
 */
export const adminRoutes = (t) => [
  {
    path: '/admin/public',
    children: [...publicRoutes(t)] // Define child routes for the private layout
  },
  {
    path: '/admin/private',
    component: AdminLayoutVue,
    children: [...privateRoutes(t)] // Define child routes for the private layout
  }
]
