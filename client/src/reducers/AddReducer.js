import { OPEN_ADD } from "./types";

export const addReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_ADD:
            return !state
        default:
            return state
    }
}