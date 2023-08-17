import { OPEN_COMMENT } from "./types";

export const commentReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_COMMENT:
            return !state
        default:
            return state
    }
}