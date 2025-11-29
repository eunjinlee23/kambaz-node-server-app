import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";
import model from "./model.js";
export default function AssignmentDao(db) {
    async function findAssignmentsForCourse(courseId) {
        const courseAssignments = await courseModel.findById(courseId, {_id: 0, assignments: 1});
        const courseAssignmentIds = courseAssignments.assignments;
        const assignments = await model.find({_id: {$in: courseAssignmentIds}})
        return assignments;
        // const { assignments } = db;
        // return assignments.filter((assignment) => assignment.course === courseId);
    }

    async function findAssignmentById(assignmentId) {
        // const { assignments } = db;
        // return assignments.find((assignment) => assignment._id === assignmentId);
        const assignment = await model.findById(assignmentId);
        return assignment
        

    }

    async function createAssignment(courseId, assignment) {
        const newAssignment = { ...assignment, _id: uuidv4()};
        // db.assignments = [...db.assignments, newAssignment];
        // return newAssignment;

        const courseAssignment = await courseModel.updateOne(
            {_id: courseId},
            {$push: {assignments: newAssignment._id}}
        )

        return model.create(newAssignment);
    }

    async function deleteAssignment(courseId, assignmentId) {
        // const { assignments } = db;
        // db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
        const status = await courseModel.updateOne(
            {_id: courseId}, {$pull: {assignments: assignmentId}}
        )
        return model.deleteOne({ _id: assignmentId });
    }

    function updateAssignment(assignmentId, assignmentUpdates) {
        // const { assignments } = db;
        // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
        // Object.assign(assignment, assignmentUpdates);
        // return assignment;
        return model.updateOne({_id: assignmentId}, {$set: assignmentUpdates})
    }

    return {
        findAssignmentsForCourse, createAssignment, deleteAssignment, updateAssignment, findAssignmentById
    }
}