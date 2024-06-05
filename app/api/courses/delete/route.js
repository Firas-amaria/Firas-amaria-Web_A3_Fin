import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs/promises";


/**
 * Handles POST request to delete a course.
 * @param {import('next/server').NextRequest} req - The incoming request.
 * @returns {Promise<import('next/server').NextResponse>} - The response to send back.
 */
export async function POST(req){
    /**
     * Extracts the course id from the request body.
     */
    const {id} = await req.json();

    console.log(`Deleting course with id: ${id}`);

    try{
        /**
         * Retrieves the user session from the request.
         */
        const session = await getServerSession(authOptions);
        const user = session.user;

        /**
         * Finds the course by its id.
         */
        const course = await Course.findById(id);

        /**
         * Checks if the course exists.
         */
        if(!course){
            return NextResponse.json({
                error: true,
                message: "Course not found!"
            })
        }

        /**
         * Checks if the user is authorized to delete the course.
         */
        if(course.author!= user.id){
            return NextResponse.json({
                error: true,
                message: "You are not authorized to delete this course!"
            })
        }

        /**
         * Deletes the course thumbnail from the public directory.
         */
        await fs.unlink(`public/uploads/${course.thumbnail}`);

        /**
         * Deletes the course from the database.
         */
        await Course.findByIdAndDelete(id);
        console.log(`Course deleted successfully!`);

        return NextResponse.json({
            error: false,
            message: "Course deleted successfully!"
        })

    }catch(e){
        console.error(e);
        return NextResponse.json({
            error: true,
            message: "An error occurred while deleting course!"
        })
    }
}