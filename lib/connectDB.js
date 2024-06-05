import mongoose from "mongoose";

/**
 * Connects to MongoDB database using Mongoose.
 * If a connection already exists, it will use the existing one.
 * 
 * @returns {Promise<void>} - Returns a Promise that resolves when the connection is established or rejected if an error occurs.
 * 
 * @throws Will throw an error if there is a problem connecting to the database.
 * 
 */
const connectDB = async () => {
    const connection = {};

    try{
        if(connection.isConnected){
            console.log("Using existing connection");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("New connection");
    }catch(error){
        console.log("Error connecting to database", error);
    }
}

export default connectDB;