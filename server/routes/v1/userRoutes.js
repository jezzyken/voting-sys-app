const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists",
      });
    }

    const user = await User.create({
      name,
      username,
      password,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      status: "success",
      data: userResponse,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.params.id;

    if (updates.password) {
      const salt = await bcrypt.genSalt(12);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
