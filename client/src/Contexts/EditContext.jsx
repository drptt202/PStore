import { createContext, useReducer } from "react";
import { editReducer } from './../reducers/EditReducer';
import { edit2Reducer } from './../reducers/Edit2Reducer';


export const EditContext = createContext()

// eslint-disable-next-line react/prop-types
export const EditProvider = ({ children }) => {
    const [openEdit, editDispatch] = useReducer(editReducer, false)
    const [openEdit2, editDispatch2] = useReducer(edit2Reducer, false)


    const EditContextData = {
        openEdit, editDispatch,
        editDispatch2, openEdit2
    }

    return (
        <EditContext.Provider value={EditContextData} >
            {children}
        </EditContext.Provider>
    )

}