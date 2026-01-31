import { axiosInstance } from "../lib/axios";

export const getProduct = (params = {}) => {
  return axiosInstance.get("/products", {
    params: {
      page: params?.page || 0,
      size: params?.size || 6,
      sort: params?.sort || [],
    },
  });
};

export const searchProduct = (params) => {
  return axiosInstance.get("/products/search", { params });
};

export const getProductDetail = (id) => {
  return axiosInstance.get(`/products/${id}`);
};
