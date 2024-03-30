import Product from "@/apiEndpoint/Admin/Product";
import APIrequest from "@/helper/apiRequest";

export const ProductService = {

    addProductService : async (values)=> {
        try {
          const payload = {
            ...Product.addProduct,
            fileData: values,
          };
          const res = await APIrequest(payload);
          return res;
        } catch (error) {
          logger(error);
          throw error;
        }
    },
    productListService : async (queryParams)=> {
      try {
        const payload = {
          ...Product.productList,
          queryParams 

        };
        const res = await APIrequest(payload);
        return res;
      } catch (error) {
        console.log(error)
        // logger(error);
        throw error;
      }
  },
  productViewDetailsService : async (id)=> {
    try {
      const payload = {
        ...Product.productViewDetails(id),
        
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
},
productEditService : async (id, values)=> {
  try {
    const payload = {
      ...Product.productEdit(id),
      fileData:values
    };
    const res = await APIrequest(payload);
    return res;
  } catch (error) {
    logger(error);
    throw error;
  }
},
productDeleteService : async (id)=> {
  try {
    const payload = {
      ...Product.productDelete(id),
    };
    const res = await APIrequest(payload);
    return res;
  } catch (error) {
    logger(error);
    throw error;
  }
},
productAddToCartService : async (bodyData)=> {
  try {
    const payload = {
      ...Product.addCart,
      bodyData

    };
    const res = await APIrequest(payload);
    return res;
  } catch (error) {
    logger(error);
    throw error;
  }
},
getCartService : async ()=> {
  try {
    const payload = {
      ...Product.getCart,

    };
    const res = await APIrequest(payload);
    return res;
  } catch (error) {
    logger(error);
    throw error;
  }
},
removeCartService : async (id)=> {
  try {
    const payload = {
      ...Product.removeCart(id),
    };
    const res = await APIrequest(payload);
    return res;
  } catch (error) {
    logger(error);
    throw error;
  }
},

}