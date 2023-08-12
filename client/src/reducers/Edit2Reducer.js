import { OPEN_EDIT } from "./types";

export const edit2Reducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_EDIT:
            return !state
        default:
            return state
    }
}