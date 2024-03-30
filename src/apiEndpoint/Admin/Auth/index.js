 
 let url ='https://gghs-api-dev.codiantdev.com/api/v1'
 const Auth = {

    accountLogin: {
    url: `http://localhost:3002/login`,
    method: "POST",
  },
  signUp:{
    url:'http://localhost:3002/user/signup',
    method:'POST'
  },
  updateProfileImage: {
    url: "/admin/update-profile-image",
    method: "PATCH",
  },
  accountLogout: {
    url: "/logout", 
    method: "POST",
  },
  forgotPassword: {
    url:'http://localhost:3002/user/forget-password',
    method: 'POST',
  },
  resetPassword: {
    url:'http://localhost:3002/user/reset-password',
    method: 'POST',
  },
  otpVerify: {
    url:'http://localhost:3002/verify-otp',
    method: 'POST',
  }
}
export default Auth
