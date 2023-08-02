import { createContext, useEffect, useState } from "react";
import axiosCustom from "../utils/axiosCustom";

export const ProductContext = createContext({})

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [data, setData] = useState({})
    useEffect(() => {
        axiosCustom.get("/")
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    })
    const ProductData = {
        data,
    }
    return (
        <ProductContext.Provider value={ProductData}>
            {children}
        </ProductContext.Provider>
    )
}