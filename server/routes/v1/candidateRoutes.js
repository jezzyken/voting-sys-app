const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/candidateController");
const upload = require("../../middlewares/upload");
const MODEL = require("../../models/candidateModel");


router.get("/", CONTROLLER.getAll);
router.get("/:id", CONTROLLER.getById);
router.get("/election/:id", CONTROLLER.getByElectionId);
router.post("/", upload.single("image"), CONTROLLER.add);
router.put("/:id", CONTROLLER.update);
router.delete("/:id", CONTROLLER.remove);
router.get('/ongoing/election/:electionId', async (req, res) => {
  console.log('election')
  try {
    const { electionId } = req.params;
    
    const candidates = await MODEL.find({ electionId })
      .populate('studentId', 'firstName middleName lastName')
      .sort('position');

    res.json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
