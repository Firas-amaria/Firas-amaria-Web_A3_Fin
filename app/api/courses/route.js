import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
/**
 * GET request handler for retrieving courses.
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The response object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export async function GET(req, res){
    try{
        console.log('Getting courses...');
        // Fetch the user session from the request
        const session = await getServerSession(authOptions);
        // Extract the user from the session
        const user = session.user;
        // Initialize courses variable
        let courses = null;
        // Check the user role and fetch the corresponding courses
        if(user.role === 'lecturer'){
            // If the user is a lecturer, fetch all courses created by the user
            courses = await Course.find({author: user.id});
        }else if(user.role === 'student'){
            // If the user is a student, fetch all courses where the user is enrolled
            // Note: This is commented out as the actual implementation is not provided
            // courses = await Course.find({enrolled: {$in: [user.id]}});
            // For the purpose of this example, we are fetching all courses
            courses = await Course.find({});
        }
        // Return a JSON response with the fetched courses
        return NextResponse.json({
            error: false,
            data: courses
        })
    }catch(err){
        // Log the error and return a JSON response with an error message
        console.log(err);
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            serverMessage: err.message
        })
    }
}