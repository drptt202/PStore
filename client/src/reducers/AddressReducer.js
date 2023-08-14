import { OPEN_ADDRESS } from "./types";

export const addressReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_ADDRESS:
            return !state
        default:
            return state
    }
}