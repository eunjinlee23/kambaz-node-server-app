import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";
export default function AssignmentDao(db) {
    async function findAssignmentsForCourse(courseId) {
        const course = await model.findById(courseId);
        return course.assignments;
        // const { assignments } = db;
        // return assignments.filter((assignment) => assignment.course === courseId);
    }

    async function findAssignmentById(courseId, assignmentId) {
        // const { assignments } = db;
        // return assignments.find((assignment) => assignment._id === assignmentId);

        const course = await model.findById(courseId);
        const assignment = course.assignments.id(assignmentId)
        return assignment
    }

    async function createAssignment(courseId, assignment) {
        const newAssignment = { ...assignment, _id: uuidv4()};
        // db.assignments = [...db.assignments, newAssignment];
        // return newAssignment;

        const status = await model.updateOne(
            {_id: courseId},
            {$push: {assignments: newAssignment}}
        )

        return newAssignment
    }

    async function deleteAssignment(courseId, assignmentId) {
        // const { assignments } = db;
        // db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
        const status = await model.updateOne(
            {_id: courseId}, {$pull: {assignments: {_id: assignmentId}}}
        )
        return status;
    }

    async function updateAssignment(courseId, assignmentId, assignmentUpdates) {
        // const { assignments } = db;
        // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
        // Object.assign(assignment, assignmentUpdates);
        // return assignment;
        const course = await model.findById(courseId);
        const assignment = course.assignments.id(assignmentId);
        Object.assign(assignment, assignmentUpdates);
        await course.save();
        return assignment;
    }

    return {
        findAssignmentsForCourse, createAssignment, deleteAssignment, updateAssignment, findAssignmentById
    }
}