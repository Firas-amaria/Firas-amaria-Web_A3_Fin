import { NextResponse } from "next/server";
import fs from "fs/promises";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * Handles POST request to create a new course.
 * @param {import("next/server").NextRequest} req - The incoming request.
 * @returns {Promise<import("next/server").NextResponse>} - The response to send back.
 */
export async function POST(req) {
    try {
        // Parse form data
        const formData = await req.formData();
        // Extract form fields
        const { name, syllabus, details, thumbnail, videos, language, parts, duration } =
            Object.fromEntries(formData);

        // Log form data
        console.log(Object.fromEntries(formData));

        // Save thumbnail to uploads folder
        let thumbnailName = "";
        if (thumbnail) {
            const uploadDir = "public/uploads";
            thumbnailName = `${Date.now()}-${thumbnail.name}`;
            const thumbnailPath = `${uploadDir}/${thumbnailName}`;

            // Convert thumbnail to buffer
            const bytes = await thumbnail.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Write thumbnail to file
            await fs.writeFile(thumbnailPath, buffer);
        }

        // Get user session
        const session = await getServerSession(authOptions);
        const user = session.user;

        // Log user
        console.log(user);

        // Create new course object
        const course = new Course({
            name,
            syllabus,
            details,
            features: [duration, parts, language],
            thumbnail: thumbnailName,
            videos: JSON.parse(videos),
            author: user.id
        });

        // Save course to database
        await course.save();

        // Return success response
        return NextResponse.json({
            error: false,
            message: "Course created successfully",
        });
    } catch (err) {
        // Log error
        console.log(err);

        // Return error response
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
        });
    }
}
