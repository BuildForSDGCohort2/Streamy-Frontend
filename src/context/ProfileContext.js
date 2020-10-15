import React, { createContext, useState } from 'react'

export const ProfileContext = createContext();

export default function ProfileProvider({ children }) {
  const [updateStatus, setUpdateStatus] = useState("");

    return (
        <ProfileContext.Provider value={{updateStatus, setUpdateStatus}} >
            {children}
        </ProfileContext.Provider>
    )
}
