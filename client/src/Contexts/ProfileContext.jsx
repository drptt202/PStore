import { createContext, useEffect, useState } from "react";
import axiosCustom from './../utils/axiosCustom';

export const ProfileContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState([])

    useEffect(() => {
        axiosCustom.get('/auth/profile')
            .then(res => {
                setProfileData(res.data.data.customer)
            })
            .catch(err => console.log(err))
    }, [])

    const ProfileContextData = {
        profileData
    }

    return (
        <ProfileContext.Provider value={ProfileContextData} >
            {children}
        </ProfileContext.Provider>
    )

}