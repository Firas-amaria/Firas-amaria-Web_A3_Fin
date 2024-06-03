
/*
this peice of code is a controller for the sidebar
that helps it change from the default style into the mini-sidebar style
*/
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