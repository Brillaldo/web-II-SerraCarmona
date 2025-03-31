import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: "Luis",
        email: "luis@gmail.com",
        age: 30,
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}