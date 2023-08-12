import { OPEN_EDIT } from "./types";

export const editReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_EDIT:
            return !state
        default:
            return state
    }
}