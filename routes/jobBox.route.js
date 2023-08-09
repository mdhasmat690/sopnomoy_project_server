const express = require("express");

const jobControllers = require("../controllers/jobBox.controller");

const router = express.Router();

router
  .route("/job/post")
  .post(jobControllers.jobPost)
  .get(jobControllers.getjob)
  .delete(jobControllers.deleteSingleJob);

router.route("/job/post/:id").get(jobControllers.getSingleData);

module.exports = router;
