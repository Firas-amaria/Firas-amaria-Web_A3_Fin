"use client";

import { SidebarContext, useSidebarContext } from "@/store/SidebarContextProvider";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Sun, SunFill } from "react-bootstrap-icons";

/**
 * The Navbar component is responsible for displaying the navigation bar at the top of the page.
 * It includes the application logo, user dropdown menu, theme toggle button, and mobile menu button.
 * @returns {JSX.Element} - The JSX code for the Navbar component.
 */
const Navbar = () => {
    /**
     * State variable to control the visibility of the user dropdown menu.
     * @type {boolean}
     */
    const [openDropdown, setOpenDropdown] = useState(false);
    
    /**
     * Context hook to access the SidebarContextProvider's context.
     * It provides methods to control the sidebar's visibility.
     */
    const {setIsOpen} = useSidebarContext();

    /**
     * The session object provided by NextAuth.js, which contains information about the current user session.
     */
    const session = useSession();

    return (
        <div>
            <nav className="bg-white dark:bg-gray-700 border-b">
                <div className="mx-auto px-10">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <Link
                                href="/"
                                className="text-2xl font-bold text-gray-800 dark:text-white"
                            >
                                LMS
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">

                            {
                                session.data ? (
                                    <>
                                        
                                        <div className="relative">
                                            <img
                                                className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
                                                src={`/uploads/${session.data?.user?.profile_img}`}
                                                onError={(e) => e.currentTarget.src = '/uploads/DefaultAvatar.png'}
                                                alt="Bordered avatar"
                                                onClick={() => setOpenDropdown((prev) => !prev)}
                                            />
                                            <div
                                                id="dropdown"
                                                className={`z-10 ${openDropdown ? "" : "hidden"
                                                    } absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                            >
                                                <ul
                                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownDefaultButton"
                                                >
                                                    <li>
                                                        <Link
                                                            href={'/profile'}
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                            onClick={() => {
                                                                setOpenDropdown(false);
                                                            }}
                                                        >
                                                            Profile
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                            onClick={() => {
                                                                setOpenDropdown(false);
                                                                signOut();
                                                            }}
                                                        >
                                                            Log out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex gap-4">
                                        
                                    </div>
                                )
                            }

                            <div className="flex items-center">
                                <button type="button" id="theme-toggle">
                                    <Sun
                                        size={20}
                                        className="hidden cursor-pointer text-white"
                                        id="theme-toggle-light-icon"
                                    />
                                    <SunFill
                                        size={20}
                                        className="hidden cursor-pointer"
                                        id="theme-toggle-dark-icon"
                                    />
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="block sm:hidden"
                                    id="mobile-menu-button"
                                    onClick= {() => setIsOpen((prev) => !prev)}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
