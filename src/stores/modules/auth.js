export const authModule = {
    namespaced: true,
    //   state: () => ({ data: {} }),
  
    state: () => ({
      user: {},
      authToken: null
    }),
    mutations: {
      setUser(state, user) {
        console.log('=====', user)
        console.log('=====>>', state)
        state.user = user 
      },
      setAuthToken(state, token) {
        state.authToken = token
      }
    },
    actions: {
       loginUser({ commit }, { data, token }) {
        console.log('setUser', data)
        console.log('setAuthToken', token)
         commit('setUser', data)  
         commit('setAuthToken', token)
      }
    },
    getters: {
      isLoggedIn: (state) => !!state.authToken,
      getUserInfo: (state) => state.user
    }
  }