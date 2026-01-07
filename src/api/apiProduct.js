import { axiosInstance } from "../lib/axios";

export const getProduct = (params) => {
 if (params && Object.keys(params).length > 0){
    return axiosInstance.get('/products/search',{
    params 
  })
 }
 return axiosInstance.get('/products')
}

export const getProductDetail = (id) => {
    axiosInstance.get(`/products/${id}`)
}