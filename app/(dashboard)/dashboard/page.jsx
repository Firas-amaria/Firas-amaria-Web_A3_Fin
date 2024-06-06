'use client';

import CourseCard from "@/components/CourseCard";
import {PlusCircle } from "react-bootstrap-icons";
import Link from "next/link";
import {useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import withSession from "@/components/HOC/withSession";

/**
 * The Home component is the main page of the application.
 * It displays a list of courses fetched from the server.
 * If the user is a lecturer, it also provides an option to create a new course.
 * 
 * @returns {JSX.Element} - The JSX representation of the Home component.
 */
function Home() {
    // State variable to store the fetched courses
    const [courses, setCourses] = useState(null);

    /**
     * Fetches the list of courses from the server.
     * Updates the 'courses' state with the fetched data.
     */
    const getCourses = async ()=> {
        const response = await fetch(`/api/courses`, {
            method: "GET",
            credentials: "include",
        });

        if(response.status === 200) {
            const result = await response.json();
            console.log('Courses: ', result);
            setCourses(result.data);
        }
    }

    // Fetch the courses when the component mounts
	useEffect(()=> {
        getCourses();
    }, []);
    
    // Get the user session data
	const { data: session, status } = useSession();
    console.log('Session', session);
    const user = session?.user;

	return (
		<div>
			<h3 className="text-xl font-medium dark:text-gray-200">All Courses</h3>
			<hr className="my-4" />

			<div className="courses grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{courses?.map((course) => {
					return <CourseCard key={course._id} course={course} author={user?.role == 'lecturer'} />;
				})}

				
				{
                    user?.role === "lecturer" && (
                        <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
						<Link href="/courses/create"><PlusCircle className="mb-2 text-primary" size={50} /></Link>
						<p className="text-gray-700 font-medium dark:text-gray-400">
							Create New
						</p>
					</div>
                    )
                }
				
			</div>

		</div>
	);
}


export const dynamic = "force-dynamic";
export default withSession(Home);