import { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducers/CartReducer";
import axiosCustom from './../utils/axiosCustom';
import { addressReducer } from "../reducers/AddressReducer";

export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [open, dispatch] = useReducer(cartReducer, false)
    const [open1, dispatch1] = useReducer(addressReducer, false)
    const [cartData, setCartData] = useState([])
    const [countItem, setCountItem] = useState()
    const [numOfI, setNumOfI] = useState([])
    const [total, setTotal] = useState(0)
    const [allItems, setAllItems] = useState([])
    const [address, setAddress] = useState([])

    useEffect(() => {
        axiosCustom.get('/cart')
            .then(res => {
                setCartData(res.data.data.carts)
                setNumOfI(res.data.data.count)
                setCountItem(res.data.data.result.length)
                setAllItems(res.data.data.result)

                setTotal(res.data.data.result.reduce((acc, val) => acc + val.Item.Price, 0))
            })
            .catch(err => console.log(err))

        axiosCustom.get('/auth/address')
            .then(res => {
                setAddress(res.data.data.address.Address)
            })
            .catch(err => console.log(err))
    }, [])


    const CartContextData = {
        allItems,
        total,
        numOfI,
        countItem,
        cartData,
        address,
        open,
        dispatch,
        open1,
        dispatch1
    }

    return (
        <CartContext.Provider value={CartContextData} >
            {children}
        </CartContext.Provider>
    )

}