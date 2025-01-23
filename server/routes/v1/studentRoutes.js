const express = require("express");
const router = express.Router();
const CONTROLLER = require("../../controllers/studentController");

router.get("/search", CONTROLLER.search);

router.route("/").get(CONTROLLER.getAll).post(CONTROLLER.add).delete(CONTROLLER.remove);

router
  .route("/:id")
  .get(CONTROLLER.getById)
  .put(CONTROLLER.update)

  //Auth
  router.post("/initiate-login", CONTROLLER.initiateLogin);
  router.post("/verify-otp", CONTROLLER.verifyOTP);
  


module.exports = router;
