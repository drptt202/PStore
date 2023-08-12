import { createContext, useReducer } from "react";
import { addReducer } from "../reducers/AddReducer";
import { add2Reducer } from "../reducers/Add2Reducer";

export const AddContext = createContext()

// eslint-disable-next-line react/prop-types
export const AddProvider = ({ children }) => {
    const [open, dispatch] = useReducer(addReducer, false)
    const [open2, dispatch2] = useReducer(add2Reducer, false)


    const AddContextData = {
        open,
        dispatch, open2, dispatch2
    }

    return (
        <AddContext.Provider value={AddContextData} >
            {children}
        </AddContext.Provider>
    )

}