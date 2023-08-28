import { createContext, useContext, useState } from 'react';

const IPContext = createContext();

export function IPProvider({ children }) {
    const [ipData, setIPData] = useState(null);

    const setIPContextData = data => {
        setIPData(data);
        console.log(data);
    };

    return (
        <IPContext.Provider value={{ ipData, setIPContextData }}>
            {children}
        </IPContext.Provider>
    );
}

export function useIPContext() {
    return useContext(IPContext);
}