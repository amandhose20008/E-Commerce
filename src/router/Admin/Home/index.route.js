import routesMap from '@/routeControl/adminRoutrMap'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
/**
 * Generates an array of route objects for admin-related pages.
 * @returns {Array} An array of route objects.
 */
export default function route() {
  return [
    {
      path: routesMap.HOME.path,
      name: 'Dashboard',
      key: routesMap.HOME.path,
      meta: {
        auth: true, // Requires authentication
        isFrontend: false, // Not frontend route
        access: true // Access allowed for admins
      },
      component: AdminDashboard // Component to render for this route
    }
  ]
}
