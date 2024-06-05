import Course from "@/models/Course";
import { NextResponse } from "next/server";
import fs from "fs/promises";

/**
 * GET request handler for retrieving a single course by its ID.
 *
 * @param {import("next/server").Request} req - The incoming request object.
 * @param {import("next/server").QueryObject} query - The query parameters object.
 * @returns {import("next/server").NextResponse} - The response object with JSON data or error.
 */
export async function GET(req, query) {
    try {
        const { id } = query.params;

        // Find the course by its ID using the Course model
        const course = await Course.findById(id);

        // Return a JSON response with the course data
        return NextResponse.json({
            error: false,
            data: course,
        });
    } catch (e) {
        // Return a JSON response with an error message and status code 500
        return NextResponse.json(
            {
                error: true,
                message: e.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH request handler for updating a course by its ID.
 *
 * @param {import("next/server").Request} req - The incoming request object.
 * @param {import("next/server").QueryObject} query - The query parameters object.
 * @returns {import("next/server").NextResponse} - The response object with JSON data or error.
 */
export async function PATCH(req, query) {
    try {
        const { id } = query.params;
        const formData = await req.formData();

        // Extract form data
        const {
            name,
            syllabus,
            details,
            thumbnail,
            videos,
            language,
            parts,
            duration,
        } = Object.fromEntries(formData);

        // Prepare update object
        const updateObject = {
            name,
            syllabus,
            details,
            features: [language, parts, duration],
            videos: JSON.parse(videos),
        };

        console.log(thumbnail);

        // Find the old course by its ID
        const oldCourse = await Course.findById(id);

        // If a new thumbnail is provided
        if (thumbnail.size > 0) {
            const uploadDir = "public/uploads";

            // Delete old thumbnail if exists
            if (oldCourse.thumbnail) {
                fs.unlink(`${uploadDir}/${oldCourse.thumbnail}`);
            }

            // Generate new thumbnail name
            const thumbnailName = `${Date.now()}-${thumbnail.name}`;
            const thumbnailPath = `${uploadDir}/${thumbnailName}`;

            // Convert thumbnail to buffer and write to file
            const bytes = await thumbnail.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await fs.writeFile(thumbnailPath, buffer);

            // Add new thumbnail name to update object
            updateObject.thumbnail = thumbnailName;
        }

        // Update the course in the database
        await Course.findByIdAndUpdate(id, updateObject);

        // Return success response
        return NextResponse.json({
            error: false,
            message: "Course updated successfully",
        });
    } catch (e) {
        // Log error and return error response
        console.log(e);
        return NextResponse.json(
            {
                error: true,
                message: e.message,
            },
            { status: 500 }
        );
    }
}
