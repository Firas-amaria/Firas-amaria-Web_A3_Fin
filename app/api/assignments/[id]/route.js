import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";


/**
 * GET request handler for retrieving a single assignment by its ID.
 *
 * @param {Request} req - The incoming request object.
 * @param {Object} query - The query parameters from the request.
 * @returns {NextResponse} - A Next.js response object with JSON data or error information.
 */
export async function GET(req, query) {
    try{
        // Extract the ID from the request parameters
        const {id} = query.params;

        // Find the assignment by its ID
        const assignment = await Assignment.findById(id);

        // Return a JSON response with the assignment data
        return NextResponse.json({
            error: false,
            data: assignment
        })
    }catch(err){
        // Log the error to the console
        console.log(err)

        // Return a JSON response with an error message and a 500 status code
        return NextResponse.json({
            error: true,
            message: "Something went wrong"
        }, { status: 500});
    }
}