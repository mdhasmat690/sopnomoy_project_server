const express = require("express");

const toolsControllers = require("../controllers/tools.controller");

const router = express.Router();

/* collection */
router
  .route("/collection")
  .post(toolsControllers.createCollection)
  .get(toolsControllers.getCollection);

router
  .route("/collection/:id")
  .delete(toolsControllers.deleteCollection)
  .put(toolsControllers.updateCollection)
  .get(toolsControllers.getSingleCollection)
  .patch(toolsControllers.updateCollectionName);

router
  .route("/collections/collection/:id")
  .get(toolsControllers.getSingleCollectionItem);

router
  .route("/postProject")
  .post(toolsControllers.saveATool)
  .get(toolsControllers.getAllTools)
  .put(toolsControllers.updateServicesCollectionMany);

router.route("/postProject/userLikes").get(toolsControllers.getAllLikeServices);

router.route("/getProjectType").get(toolsControllers.getGroupProjects);

router
  .route("/postProject/:id")
  .get(toolsControllers.getSingleTool)
  .patch(toolsControllers.updateService)
  .put(toolsControllers.watchServices)
  .delete(toolsControllers.deleteService);

router
  .route("/postProject/related/:email")
  .get(toolsControllers.getRelatedTools);

router.route("/like").post(toolsControllers.likeSave);

router.route("/like/:email").get(toolsControllers.getAllLikeServices);

module.exports = router;
