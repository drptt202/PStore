import axiosCustom from "../utils/axiosCustom";

export const getByCategory = (category) => axiosCustom.get(`/product/${category}`)

export const getByCategorynBrand = (category, brand) => axiosCustom.get(`/product/${category}/n/${brand}`)

export const productDetails = (category, name) => axiosCustom.get(`/product/${category}/${name}`)

export const recommendSearch = (keyword) => axiosCustom.post(`/product/search/${keyword}`)

export const searchByKeyword = (keyword) => axiosCustom.get(`/product/search/${keyword}`)

export const getOrder = (type) => axiosCustom.get(`/cart/${type}`)

export const checkout = (code) => axiosCustom.post(`/cart/checkout/${code}`)

export const add1ToCart = (code) => axiosCustom.post(`/cart/${code}`)

export const delete1 = (code) => axiosCustom.put(`/cart/${code}`)

export const deleteType = (code) => axiosCustom.delete(`/cart/cancel/${code}`)
