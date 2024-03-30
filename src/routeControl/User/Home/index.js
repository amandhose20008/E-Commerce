import { baseRoutes } from '@/helper/baseRoutes'

// Define access route for the user interface, including a path for the home page.
const accessRoute = {
  HOME: {
    path: `${baseRoutes.userBaseRoutes}dashboard`
  },
  PRODUCT: {
    path: `${baseRoutes.userBaseRoutes}product`
  },
  CHECKOUT: {
    path: `${baseRoutes.userBaseRoutes}checkout`
  },
}

export default accessRoute
