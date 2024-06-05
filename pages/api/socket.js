import { Server } from "socket.io";
import {getSession} from 'next-auth/react';

/**
 * This function is a Next.js API route handler that starts a Socket.IO server.
 * It listens for messages from the main server and saves them to the database.
 * 
 * @param {import('next').NextApiRequest} req - The request object
 * @param {import('next').NextApiResponse} res - The response object
 * 
 * @returns {import('next').NextApiResponse} - The response object with status code and message
 */
export default function handler(req, res) {
	// Check if the Socket.IO server is already running
	if (res.socket.server.io) {
		return res.status(200).json({
			success: true,
			message: "Socket is already running",
		});
	}

	console.log("Starting Socket.IO server on port:");

	// Create a new Socket.IO server
	const io = new Server(res.socket.server);

	// Middleware to attach user session to each socket connection
	io.use(async (socket, next) => {
		const session = await getSession({ req: socket.request });
		socket.user = session?.user;
		return next();
	});

	// Event listener for socket connection
	io.on("connection", (socket) => {
		console.log("A user connected", socket.id);

		// Event listener for socket disconnection
		socket.on("disconnect", () => {
			console.log("A user disconnected");
		});

		// Event listener for message request
		socket.on("message:request", async (data, cb) => {
			cb("Message received");

			// Save message to database
			console.log('Message saving...');
			console.log('API_BASE_URL', process.env.API_BASE_URL);
			const response = await fetch(
				`${process.env.API_BASE_URL}/messages`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						courseId: data.courseId,
						message: data.message,
						user: socket.user,
					}),
				}
			);

			// Check if message was saved successfully
			if (response.status === 201) {
				console.log("Message saved");
				const result = await response.json();
				// Emit message response to all connected clients
				io.emit("message:response", result.data);
			}
		});
	});

	// Assign the Socket.IO server to the response object
	res.socket.server.io = io;
	// Return success response
	return res.status(201).json({ success: true, message: "Socket is started" });
}

