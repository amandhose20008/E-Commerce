import APIrequest from '@/helper/apiRequest'
import Auth from '@/apiEndpoint/Admin/Auth/index'

export const AdminAuthServices = {
  userLogin: async (values) => {
    console.log(values,"frewf")
    try {
      const payload = {
        ...Auth.accountLogin,
        bodyData: values
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  userSignUp: async (values) => {
    try {
      const payload = {
        ...Auth.signUp,
        fileData: values
      }

      console.log('paylod', values)
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  logoutService: async () => {
    try {
      const payload = {
        ...Auth.accountLogout
      }
      const res = await APIrequest(payload)
      return res
    } catch (err) {
      logger(err)
    }
  },
  updateProfileImageService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.updateProfileImage,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  }
}
