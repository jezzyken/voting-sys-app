const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/electionController");
const MODEL = require("../../models/electionModel");

router.get("/", CONTROLLER.getAll).post("/", CONTROLLER.add);
router
  .get("/:id", CONTROLLER.getById)
  .put("/:id", CONTROLLER.update)
  .delete("/:id", CONTROLLER.remove);

router.get("/ongoing/candidates", CONTROLLER.getOngoingElectionCandidates);
router.get("/upcoming/events", CONTROLLER.getUpcomingEvents);
router.get("/ongoing/events", async (req, res) => {
  try {
    const ongoingElections = await MODEL.find({
      status: "ongoing",
    });
    res.json(ongoingElections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/completed/events", async (req, res) => {
  try {
    const completedElections = await MODEL.find({
      status: "completed",
    }).sort("-endDate");

    res.json(completedElections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
