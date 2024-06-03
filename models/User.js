import mongoose from "mongoose";

/**
 * this is the schema for the Users model in the MongoDb 
 */
const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profile_img: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'lecturer'],
    },
});

const User =  mongoose.models.User || mongoose.model('User', useSchema);

export default User;