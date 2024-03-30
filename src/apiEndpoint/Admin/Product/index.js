const Product = {

    addProduct:{
        url:'http://localhost:3002/product/create',
        method:'POST'
    },
    productList:{
        url:'http://localhost:3002/product',
        method:'GET'
    },
    productViewDetails : (id) => ({
        url:`http://localhost:3002/product/${id}`,
        method:'GET'
    }),
    productEdit : (id) => ({
        url:`http://localhost:3002/product/${id}`,
        method:'PUT'
    }),
    productDelete : (id) => ({
        url:`http://localhost:3002/product/${id}`,
        method:'DELETE'
    }),
    addCart :{
        url:'http://localhost:3002/cart',
        method:'POST'
    },
    getCart : {
        url:'http://localhost:3002/cart',
        method:'GET'    
    },
    removeCart : (id) => ({
        url:`http://localhost:3002/cart/${id}`,
        method:'DELETE'
    }),


}
export default Product 