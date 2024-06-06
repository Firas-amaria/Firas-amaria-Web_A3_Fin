/**
 * This is the Courses component that displays a list of courses.
 * It fetches the user's courses from the server and renders them using CourseCard components.
 * If the user is a lecturer, it also provides an option to create a new course.
 * 
 * @returns {JSX.Element} - The JSX element representing the Courses component.
 */

'use client';

import CourseCard from "@/components/CourseCard";
import { PlusCircle } from "react-bootstrap-icons";
import {useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import withSession from "@/components/HOC/withSession";

const Courses = () => {
    /**
     * State variable to store the fetched courses.
     * @type {Array}
     */
    const [courses, setCourses] = useState(null);

    /**
     * Fetch the user's session data.
     */
    const { data: session, status } = useSession();

    // Log the session data to the console.
    console.log('Session', session);

    // Extract the user data from the session.
    const user = session?.user;

    /**
     * Fetch the user's courses from the server.
     */
    const fetchCourses = async () => {
        const response = await fetch('/api/courses/my-courses', {
            method: 'GET',
            credentials: 'include', 
        });

        // If the response status is 200, parse the JSON response and update the courses state.
        if(response.status === 200) {
            const result = await response.json();
            console.log('Courses: ', result);
            setCourses(result.data);
        }
    }

    // Fetch the courses when the component mounts.
    useEffect(()=> {
        fetchCourses();
    }, [])

    return (
        <div>
            <h3 className="text-xl font-medium">Our Courses</h3>
            <hr className="my-4" />

            <div className="courses grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses?.map((course) => {
                    return <CourseCard key={course._id} course={course} author={user?.role === 'lecturer'} />;
                })}

                {
                    user?.role === 'lecturer' &&
                    <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
                        <PlusCircle className="mb-2 text-primary cursor-pointer" size={50} />
                        <p className="text-gray-700 font-medium dark:text-gray-400">
                            Create New
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

// Export the Courses component as a dynamic page.
export const dynamic = "force-dynamic";

// Wrap the Courses component with the withSession HOC.
export default withSession(Courses);