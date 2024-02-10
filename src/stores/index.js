import { createStore } from 'vuex'
// import { moduleA } from
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { authModule } from './modules/auth'

var ls = new SecureLS({ isCompression: false })
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule
  },
  plugins: [
    createPersistedState({
      key: 'JayVueX',
      paths: ['auth'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
})
