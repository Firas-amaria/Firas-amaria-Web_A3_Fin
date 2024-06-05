import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";

/**
 * PATCH request handler for updating user profile information.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 *
 * @throws Will throw an error if there is a problem with the request or database operation.
 */
export async function PATCH(req){
    try{
        // Fetch the user session from the request

        const session = await getServerSession(authOptions);
        const user = session.user;
        // Parse the form data from the request
        const formData = await req.formData();
        const data = Object.fromEntries(formData);
        // Update the user's profile in the database
        const updatedUser = await User.findByIdAndUpdate(user.id, {
            ...data
        }, { new: true });
        // Return a JSON response with the updated user data

        return NextResponse.json({
            error: false,
            data: updatedUser
        });
    }catch(e){
        // Log the error and return a JSON response with an error message
        console.log(e);
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}