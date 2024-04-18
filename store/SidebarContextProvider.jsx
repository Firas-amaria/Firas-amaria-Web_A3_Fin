'use client';

const { createContext, useState, useEffect, useContext } = require("react");


const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=> {
        console.log(isOpen);
    }, [isOpen]);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    return useContext(SidebarContext);
}

export { SidebarContext, SidebarContextProvider };