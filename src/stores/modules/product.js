export const productModule = {
    namespaced: true,

    state:() =>({
        product:{}
    }),
    mutations:{
        setProduct(state, data){
            state.product = data
        }
    },
    actions:{
        productList({commit}, {data}){
            commit('setProduct', data)
        }
    },
    getters: {
        getCartList:(state) => state.product
    }

}