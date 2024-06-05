import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import fs from "fs";

const { NextResponse } = require("next/server");


/**
 * Handles POST request for user registration.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - The response object with JSON data.
 */
export async function POST(req){
    // Parse form data from the request
    const formData = await req.formData();
    
    try{
        // Connect to the database
        await connectDB();

        // Extract user details from form data
        const { name, email, password, role } = Object.fromEntries(formData);

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email });
        if(existingUser){
            // Return error response if user already exists
            return NextResponse.json({
                error: true,
                message: "User already exists"
            }, {
                status: 400
            })
        }

        // Get profile image from form data
        const profile_img = formData.get('profile_img');
        // Generate unique name for the profile image
        const profileImgName = `${Date.now()}-${profile_img.name}`;
        // Define the path to save the profile image
        const profile_img_path = `${process.cwd()}/public/uploads/${profileImgName}`;
        
        // Log the profile image and its path
        console.log(profile_img, profile_img_path);
        // Convert the profile image to bytes and save it to the defined path
        const profileImgBytes = await profile_img.arrayBuffer();
        const profileImgBuffer = Buffer.from(profileImgBytes);
        fs.writeFileSync(profile_img_path, profileImgBuffer);

        // Create a new user object with the provided details
        const user = new User({
            name,
            email,
            password,
            role,
            profile_img: profileImgName
        });

        // Save the user to the database
        await user.save();

        // Return success response
        return NextResponse.json({
            error: false,
            message: "User registered successfully"
        })

    }catch(error){
        // Log any errors that occur during the registration process
        console.log(error);
        // Return error response with a generic error message
        return NextResponse.json({
            error: true,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}