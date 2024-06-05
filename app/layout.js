import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import { SidebarContextProvider } from "@/store/SidebarContextProvider";

/**
 * this is the main layout for our website the main layout has a navbar on the top and we insert
 * "children" into the rest of the page layout children are inserted using <Link> elements from the next.js 
 */

const inter = Inter({ subsets: ["latin"] });

//this is for the web page name and discreption
export const metadata = {
	title: "Course Management",
	description: "Manage your courses with ease",
};

/**
 * This is the main layout for our website. The main layout has a navbar on the top and we insert
 * "children" into the rest of the page layout. Children are inserted using <Link> elements from the next.js.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The children components to be rendered within the layout.
 *
 * @returns {React.ReactElement} - The root element of the layout.
 */
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<SidebarContextProvider>
				<body className={`${inter.className} dark:bg-gray-600`}>
					<SessionWrapper>
						<Navbar />
					</SessionWrapper>
					{children}
				</body>
			</SidebarContextProvider>

			<Script src="/js/main.js" />
		</html>
	);
}
