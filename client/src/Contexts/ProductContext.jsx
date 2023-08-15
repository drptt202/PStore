import { createContext, useEffect, useState } from "react";
import axiosCustom from "../utils/axiosCustom";

export const ProductContext = createContext({})

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [top5, setTop5] = useState([])
    const [selling, setSelling] = useState([])
    const [store, setStore] = useState([])

    useEffect(() => {
        axiosCustom.get("/product/top-5")
            .then((res) => {
                setTop5(res.data.data.products)
            }).catch((err) => {
                console.log(err)
            })
        axiosCustom.get("/product/top-selling")
            .then((res) => {
                setSelling(res.data.data.products)
            }).catch((err) => {
                console.log(err)
            })
        axiosCustom.get("/store/item")
            .then((res) => {
                setStore(res.data.data.store.ProductCode)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    const ProductData = {
        top5, selling, store
    }
    return (
        <ProductContext.Provider value={ProductData}>
            {children}
        </ProductContext.Provider>
    )
}