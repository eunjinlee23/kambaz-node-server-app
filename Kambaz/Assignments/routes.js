import AssignmentDao from "./dao.js";
export default function AssignmentRoutes(app, db) {
    const dao = AssignmentDao(db);
    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    }

    const findAssignmentById = async (req, res) => {
        const { courseId, assignmentId } = req.params;
        const assignment = await dao.findAssignmentById(courseId, assignmentId);
        res.send(assignment);
    }

    const createAssignmentForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignment = { ...req.body};
        const newAssignment = dao.createAssignment(courseId, assignment);
        res.send(newAssignment);
    }

    const deleteAssignment = async (req, res) => {
        const { courseId, assignmentId } = req.params;
        const status = await dao.deleteAssignment(courseId, assignmentId);
        res.send(status);
    }

    const updateAssignment = async (req, res) => {
        const { courseId, assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(courseId, assignmentId, assignmentUpdates);
        res.send(status);
    }


    app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
    app.get("/api/courses/:courseId/assignments/:assignmentId", findAssignmentById)
    app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
}