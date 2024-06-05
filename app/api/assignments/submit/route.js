import { NextResponse } from "next/server";
import fs from "fs/promises";
import Assignment from "@/models/Assignment";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * Handles POST request for submitting an assignment.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - The response object with JSON data.
 */
export async function POST(req) {
    try {
        // Parse form data
        const formData = await req.formData();
        const { assignmentId, assignmentFile, note } =
            Object.fromEntries(formData);

        // Log received data
        console.log(assignmentId, assignmentFile, note)

        // Get user session
        const session = await getServerSession(authOptions);
        const user = session.user;

        // Save assignmentFile to uploads folder
        const uploadDir = "public/uploads";
        const fileName = `${Date.now()}-${assignmentFile.name}`;
        const filePath = `${uploadDir}/${fileName}`;

        // Convert file to buffer
        const bytes = await assignmentFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Write file to disk
        await fs.writeFile(filePath, buffer);

        // Create new submission object
        const newSubmission = { student: user.id, file: fileName, note };

        // Find assignment in database and add submission
        const assignment = await Assignment.findById(assignmentId);
        assignment.submissions.push(newSubmission);
        await assignment.save();

        // Return success response
        return NextResponse.json({
            error: false,
            message: "Assignment submitted successfully",
        });
    } catch (err) {
        // Log error
        console.log(err)

        // Return error response
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
        }, { status: 500});
    }
}
