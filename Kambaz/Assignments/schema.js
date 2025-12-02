import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: String, 
        points: Number,
        available: Date,
        due: Date,
        until: Date,
        description: String,
    },
);
export default schema;