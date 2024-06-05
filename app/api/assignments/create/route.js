import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";


/**
 * Handles POST request to create a new assignment.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a NextResponse object.
 */
export async function POST(req){
    try{
        // Parse form data from the request
        const formData = await req.formData();

        // Extract the required fields from the form data
        const { courseId, title, description } = Object.fromEntries(formData);

        // Create a new Assignment object and save it to the database
        const assignment = await new Assignment({
            course: courseId,
            title,
            description
        }).save();

        // Return a JSON response indicating success
        return NextResponse.json({
            error: false,
            message: 'Assignment created successfully'
        })
    }catch(e){
        // Log the error to the console
        console.error(e);

        // Return a JSON response indicating an error
        return NextResponse.error({
            error: true,
            message: 'Something went wrong'
        })
    }
}