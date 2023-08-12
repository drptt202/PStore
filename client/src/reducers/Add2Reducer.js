import { OPEN_ADD } from "./types";

export const add2Reducer = (state, action) => {
    const { type } = action
    const role = localStorage.getItem('Role')
    switch (type) {
        case OPEN_ADD:
            if (role === 'Admin') {
                return !state
            } else return state
        default:
            return state
    }
}