import Message from "@/models/Message";
import { NextResponse } from "next/server";

/**
 * POST method handler for sending messages in the chat room server.
 * 
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - The response object with JSON data and status code.
 */
export async function POST(req){
    try{
        // Parse the request body as JSON
        const data = await req.json();
        // Log the received data for debugging purposes
        console.log(data);

        // Create a new Message object with the received data
        const message = new Message({
            courseId: data.courseId,
            sender: {
                name: data.user.name,
                email: data.user.email
            },
            message: data.message
        });
        // Save the new message to the database
        const newMessage = await message.save();
        // Return a JSON response with the new message data and a 201 status code
        return NextResponse.json({
            error: false,
            data: newMessage
        }, {status: 201});
    }catch(e){
        // Return a JSON response with an error message and a 500 status code
        return NextResponse.json({
            error: true,
            message: e.message
        }, {status: 500});
    }
}


export async function GET(req){
    try{
       const courseId = req.nextUrl.searchParams.get('courseId');

       const messages = await Message.find({courseId});
        
        return NextResponse.json({
            error: false,
            data: messages
        });
    }catch(e){
        return NextResponse.json({
            error: true,
            message: e.message
        }, {status: 500});
    }
}