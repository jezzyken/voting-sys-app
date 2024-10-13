const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/studentController");

router.get("/search", CONTROLLER.search);

router.route("/").get(CONTROLLER.getAll).post(CONTROLLER.add);

router
  .route("/:id")
  .get(CONTROLLER.getById)
  .put(CONTROLLER.update)
  .delete(CONTROLLER.remove);

module.exports = router;
