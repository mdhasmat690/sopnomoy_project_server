const express = require("express");
const ChatControllers = require("../controllers/chat.controller");

const router = express.Router();

router
  .route("/createConverSion")
  .post(ChatControllers.saveConverSion)
  .get(ChatControllers.getConversion);

router.route("/createConverSion/:id").patch(ChatControllers.editConverSion);

router.route("/message").post(ChatControllers.saveMessage);
router.route("/message/:id").get(ChatControllers.getMessage);

router
  .route("/createConverSions/allConversion")
  .get(ChatControllers.getConversions);

module.exports = router;
