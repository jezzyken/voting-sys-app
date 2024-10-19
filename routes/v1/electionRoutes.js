const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/electionController");

router.get("/", CONTROLLER.getAll).post("/", CONTROLLER.add);
router
  .get("/:id", CONTROLLER.getById)
  .put("/:id", CONTROLLER.update)
  .delete("/:id", CONTROLLER.remove);

router.get("/ongoing/candidates", CONTROLLER.getOngoingElectionCandidates)
router.get("/upcoming/events", CONTROLLER.getUpcomingEvents)

module.exports = router;
