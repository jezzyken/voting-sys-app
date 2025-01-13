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
// url("https://plus.unsplash.com/premium_photo-1708022615102-e82359b68f08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
module.exports = router;
