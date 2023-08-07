import { RECOMMEND_SEARCH } from "./types";

export const searchReducer = (state, action) => {
    const { type } = action
    switch (type) {
        case RECOMMEND_SEARCH:
            return !state
        default:
            return state
    }
}