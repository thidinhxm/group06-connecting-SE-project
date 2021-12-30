const express = require("express");
const router = express.Router();

const requestController = require("../controllers/request");
const postController = require("../controllers/post");

router.get("/tutor-requests", requestController.listTutorRequests);
router.get("/tutor-requests/:id", requestController.showTutorRequest);
router.get("/create", postController.create);
router.get("/student-requests", requestController.listStudentRequests);
router.get(
  "/student-requests/:student_request_id",
  requestController.showStudentRequest
);
router.post("/student-requests/cancel", requestController.cancel);
router.post("/tutor-requests/cancel", requestController.cancel);
router.post("/create", postController.createPost);
module.exports = router;
