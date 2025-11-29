import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: String, 
        points: Number,
        available: String,
        due: String,
        until: String,
        description: String,
    },
);
export default schema;