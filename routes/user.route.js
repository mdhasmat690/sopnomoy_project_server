const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .post(userController.saveUserInfo)
  .put(userController.updateUserInfo);

router.route("/:id").get(userController.getUserDetail);

router.route("/update/:id").patch(userController.updateUserMore);

module.exports = router;
