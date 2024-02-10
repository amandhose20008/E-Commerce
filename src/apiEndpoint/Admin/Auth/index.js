 
 let url ='https://gghs-api-dev.codiantdev.com/api/v1'
 const Auth = {

    accountLogin: {
    url: `http://localhost:3000/login`,
    method: "POST",
  },
  signUp:{
    url:'http://localhost:3000/user/signup',
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
}
export default Auth
