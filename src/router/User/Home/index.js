import routesMap from '@/routeControl/userRouteMap'
import Product from '@/views/Product.vue'
import Dashboard from '@/views/Dashboard.vue'
import CheckoutVue from '@/views/Checkout.vue'

/**
 * Generates an array of route objects for the user home page.
 * @returns {Array} An array containing a route object for the user home page.
 */
export default function route() {
  return [     
    // User Home Route
    {
      path: routesMap.HOME.path,
      name: 'Home',
      key: routesMap.HOME.path,
      meta: {
        sidebar:true,
        auth: true, // Requires authentication
        isFrontend: true, // Frontend route
        // breadcrumb: 'Dashboard'
      },
      component: Dashboard // Component to be rendered for the user home page
    },

    // Update Profile Route
    {
      path: routesMap.PRODUCT.path,
      name: 'Product',
      key: routesMap.PRODUCT.path,
      meta: {
        sidebar:true,
        auth: true, // Requires authentication
        isFrontend: true, // Frontend route
        // breadcrumb: 'Product'
      },
      component: Product // Component to be rendered for the update profile page
    },
    {
      path: routesMap.CHECKOUT.path,
      name: 'Checkout',
      key: routesMap.CHECKOUT.path,
      meta: {
        sidebar:false,
        auth: true, // Requires authentication
        isFrontend: true, // Frontend route
        breadcrumb: 'Checkout'
      },
      component: CheckoutVue // Component to be rendered for the update profile page
    }
  ]
}
