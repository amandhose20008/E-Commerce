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
    productListService : async (values)=> {
      try {
        const payload = {
          ...Product.productList,
          // bodyData: values,
        };
        const res = await APIrequest(payload);
        return res;
      } catch (error) {
        logger(error);
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
}

}