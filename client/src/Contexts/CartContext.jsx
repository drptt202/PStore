import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers/CartReducer";

export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [open, dispatch] = useReducer(cartReducer, false)

    const CartContextData = {
        open,
        dispatch
    }

    return (
        <CartContext.Provider value={CartContextData} >
            {children}
        </CartContext.Provider>
    )

}