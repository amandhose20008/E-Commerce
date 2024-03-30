import APIrequest from '@/helper/apiRequest'
import Auth from '@/apiEndpoint/Admin/Auth/index'

export const AdminAuthServices = {
  userLogin: async (values) => {
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
  },
  forgotPassword: async (bodyData, queryParams) => {
    try {
      const payload = {
        ...Auth.forgotPassword,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  resetPasswordService: async (bodyData, token) => {
    try {
      const payload = {
        ...Auth.resetPassword,
        bodyData,
        formHeaders:{authorization: `Bearer ${token}`}
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  OtpVerificationService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.otpVerify,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
}
