export const authModule = {
    namespaced: true,
    //   state: () => ({ data: {} }),
  
    state: () => ({
      user: {},
      authToken: null,
      authStatus: false,
      isAdmin: false
    }),
    mutations: {
      setUser(state, user) {
        state.user = user 
      },
      setAuthToken(state, token) {
        state.authToken = token
      },
     setAuthStatus(state) {
      state.authStatus = true
    },
    },
    actions: {
       loginUser({ commit }, { data, token }) {
        console.log('setUser', data)
        console.log('setAuthToken', token)
         commit('setUser', data)  
         commit('setAuthToken', token)
         commit('setAuthStatus')
      }
    },
    getters: {
      isLoggedIn: (state) => !!state.authToken,
      getUserInfo: (state) => state.user,
      isAuthenticated: state => {
        return !!state.authToken; // Convert authToken to a boolean value
      },
      authStatus: (state) => {
        return state.authStatus
      }
    }
  }  