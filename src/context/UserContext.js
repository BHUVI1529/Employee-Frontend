import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('id'));

    useEffect(() => {
        const storedUserId = localStorage.getItem('id');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      }, []);  // Only run on mount to check localStorage

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
