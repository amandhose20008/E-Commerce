import { baseRoutes } from '@/helper/baseRoutes'

// Define access routes for the user interface, including paths for landing page, FAQ, privacy policy, terms and conditions, login, and signup.
const accessRoute = {
    LOGIN: {
      path: `${baseRoutes.adminBaseRoutes}/login`,
    },
}

export default accessRoute
