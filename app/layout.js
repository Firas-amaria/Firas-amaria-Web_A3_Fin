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

export const metadata = {
	title: "Course Management",
	description: "Manage your courses with ease",
};

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
