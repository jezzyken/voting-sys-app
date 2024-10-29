const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    StudentIdNo: { type: String, required: true },
    role: { type: String, default: "student" },
    yearLevel: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    otp: { type: String },
    otpExpires: { type: Date },
    password: { type: String },
  },
  { timestamps: true }
);

function generateRandomPassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

studentSchema.pre("save", function (next) {
  if (!this.password) {
    this.password = generateRandomPassword();
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema);
