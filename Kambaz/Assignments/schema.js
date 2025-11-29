import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
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
    { collection: "assignments"}
);
export default assignmentSchema;