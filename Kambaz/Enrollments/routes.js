import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const createEnrollment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const { courseId } = req.params;
        const newEnrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
        res.send(newEnrollment);
    }

    // const getEnrollments = (req, res) => {
    //     const enrollments = dao.getEnrollments();
    //     res.send(enrollments)
    // }

    const deleteEnrollments = async (req, res) => {
        const { enrollmentId } = req.params;
        const status = await dao.unenrollUserFromCourse(enrollmentId);
        res.send(status);
    }

    app.post("/api/users/current/enrollments/:courseId", createEnrollment);
    app.delete("/api/enrollments/:enrollmentId", deleteEnrollments);
    // app.get("/api/enrollments", getEnrollments);
}