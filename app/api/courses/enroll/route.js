import Course from "@/models/Course";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to enroll a user to a course.
 * @param {import("next/server").NextRequest} req - The incoming request.
 * @returns {import("next/server").NextResponse} - The response to send back.
 */
export async function POST(req) {
    try {
        /**
         * Extracts the courseId and userId from the request body.
         * @type {{ courseId: string, userId: string }}
         */
        const { courseId, userId } = await req.json();
        
        // Enroll the user to the course
        /**
         * Finds the course by its id and adds the userId to the enrolled list.
         * @type {import("@/models/Course")}
         */
        const course = await Course.findById(courseId);
        course.enrolled.push(userId);
        await course.save();

        // Returns a success response
        return NextResponse.json({
            success: true,
            message: "Enrolled successfully!",
        });
    } catch (e) {
        // Logs the error and returns an error response
        console.log(e);
        return NextResponse.json({
            error: true,
            message: "Something went wrong!",
        });
    }
}
