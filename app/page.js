import Link from "next/link";

/**
 * This is the Home component, which is the first page that shows when entering the link.
 * It has a small description of the website and a "Get Started" button that sends the user to the login page.
 * If the user is already logged in, it sends them to their dashboard.
 * 
 * @returns {JSX.Element} - The JSX representation of the Home component.
 */
const Home = () => {
    return (
		<div className="py-20 px-10 flex gap-4 justify-center items-center dark:bg-gray-700">
			<div>
				<div className="max-w-xl">
					<h3 className="text-5xl max-sm:text-3xl font-bold text-gray-800 leading-tight dark:text-gray-200">
						WELCOME TO LMS
					</h3>
					<p className="text-2xl text-gray-500 mt-6 dark:text-gray-400 max-sm:text-lg">
						Start studying from home. Arrange your space,tools,and
						mindset. As experts in the field, we advocate providing
						student-focused support, even when we have a lot of
						work.
					</p>
					<div className="mt-4">
						<Link href={'/auth/login'}
							type="button"
							class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-16 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						>
							Get Started
						</Link>
						
					</div>
				</div>
			</div>
			<div>
				<img className="max-w-lg hidden sm:block" src="/images/hero.png" />
			</div>
		</div>
	);
};

export default Home;
