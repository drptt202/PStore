import { OPEN_ADD } from "./types";

export const add2Reducer = (state, action) => {
    const { type } = action
    switch (type) {
        case OPEN_ADD:
            if (localStorage.getItem('Role') === 'Admin') {
                return !state
            } else return state
        default:
            return state
    }
}