import auth from '@/routeControl/User/Auth'
import home from '@/routeControl/User/Home'

// Combine and export different access control routes for the application, including routes for authentication, user profile, and home.
const AccessControl = {
  ...auth,
  ...home
}

export default AccessControl
