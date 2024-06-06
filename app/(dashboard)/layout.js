/**
 * DashboardLayout is a React functional component that acts as a layout for the dashboard.
 * It renders the sidebar and the main content area, and handles the toaster notifications.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The children components to be rendered inside the main content area.
 * 
 * @returns {React.ReactElement} - The DashboardLayout component.
 */
"use client";

import SessionWrapper from "@/components/SessionWrapper";
import Sidebar from "@/components/Sidebar";
import { useSidebarContext } from "@/store/SidebarContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }) => {
	/**
     * isOpen is a state variable that determines whether the sidebar is open or closed.
     * It is obtained from the SidebarContextProvider using the useSidebarContext hook.
     */
    const {isOpen} = useSidebarContext();

	return (
		<>
			<div className="flex absolute top-0 left-0 w-full -z-10">
				<div
					className={`sidebar ${isOpen ? '' : 'hidden'} absolute sm:relative top-0 left-0 sm:block pt-24 h-screen border-e bg-white dark:bg-gray-700`}
				>
					<SessionWrapper>
						<Sidebar />
					</SessionWrapper>
				</div>
				<div className="pt-24 px-10 w-full h-screen overflow-y-auto dark:bg-gray-600">
					<main>{children}</main>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default DashboardLayout;
