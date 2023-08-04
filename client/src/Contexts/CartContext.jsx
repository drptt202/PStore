import { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducers/CartReducer";
import axiosCustom from './../utils/axiosCustom';

export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [open, dispatch] = useReducer(cartReducer, false)
    const [cartData, setCartData] = useState([])
    const [countItem, setCountItem] = useState()
    const [numOfI, setNumOfI] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        axiosCustom.get('/cart')
            .then(res => {
                setCartData(res.data.data.carts)
                setNumOfI(res.data.data.count)
                setCountItem(res.data.data.result.length)
                setTotal(res.data.data.result.reduce((acc, val) => acc + val.Price, 0))
            })
            .catch(err => console.log(err))
    }, [])

    const CartContextData = {
        total,
        numOfI,
        countItem,
        cartData,
        open,
        dispatch
    }

    return (
        <CartContext.Provider value={CartContextData} >
            {children}
        </CartContext.Provider>
    )

}