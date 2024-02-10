const Product = {

    addProduct:{
        url:'http://localhost:3000/product/create',
        method:'POST'
    },
    productList:{
        url:'http://localhost:3000/product',
        method:'GET'
    },
    productViewDetails : (id) => ({
        url:`http://localhost:3000/product/${id}`,
        method:'GET'
    }),
    productEdit : (id) => ({
        url:`http://localhost:3000/product/${id}`,
        method:'PUT'
    }),
    productDelete : (id) => ({
        url:`http://localhost:3000/product/${id}`,
        method:'DELETE'
    })

}
export default Product 