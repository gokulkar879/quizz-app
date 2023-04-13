import React, { useContext, useState } from "react";

//context to keep track of the user

const UserContext = React.createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    return <UserContext.Provider value={{
        user,
        setUser
    }}>
        {
            children
        }
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export default UserProvider