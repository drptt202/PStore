import { OPEN_CART } from "./types";

export const cartReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_CART:
            return !state
        default:
            return state
    }
}