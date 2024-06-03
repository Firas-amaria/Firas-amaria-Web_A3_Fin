import mongoose from "mongoose";

/**
 * this is the schema for the Messages model in the MongoDb 
 */
const MessageSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    sender: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    message: {
        type: String,
        required: true
    },
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;