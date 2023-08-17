import { createContext, useReducer } from "react";
import { commentReducer } from "../reducers/CommentReducer";

export const CommentContext = createContext()

// eslint-disable-next-line react/prop-types
export const CommentProvider = ({ children }) => {
    const [open, dispatch] = useReducer(commentReducer, false)

    const CommentContextData = {
        open, dispatch
    }

    return (
        <CommentContext.Provider value={CommentContextData} >
            {children}
        </CommentContext.Provider>
    )

}