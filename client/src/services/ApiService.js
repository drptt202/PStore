import axiosCustom from "../utils/axiosCustom";

export const productDetails = (loai, ten) => axiosCustom.get(`/product/${loai}/${ten}`)

export const add1ToCart = (code) => axiosCustom.post(`/cart/${code}`)

export const delete1 = (code) => axiosCustom.put(`/cart/${code}`)