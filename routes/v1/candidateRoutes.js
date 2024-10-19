const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/candidateController");
const upload = require("../../middlewares/upload");

router.get("/", CONTROLLER.getAll);
router.get("/:id", CONTROLLER.getById);
router.post("/", upload.single("image"), CONTROLLER.add);
router.put("/:id", CONTROLLER.update);
router.delete("/:id", CONTROLLER.remove);

module.exports = router;
