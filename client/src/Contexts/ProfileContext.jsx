import { createContext, useEffect, useState } from "react";
import axiosCustom from './../utils/axiosCustom';

export const ProfileContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState([])
    const [Username, setUsername] = useState('')


    useEffect(() => {
        axiosCustom.get('/auth/profile')
            .then(res => {
                setProfileData(res.data.data.customer[0])
                setUsername(res.data.data.customer[0].Username)

            })
            .catch(err => console.log(err))
    }, [])



    const ProfileContextData = {
        profileData, Username
    }

    return (
        <ProfileContext.Provider value={ProfileContextData} >
            {children}
        </ProfileContext.Provider>
    )

}