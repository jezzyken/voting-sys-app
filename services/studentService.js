const MODEL = require("../models/studentModel");
const { generateOTP, sendOTPEmail } = require("../utils/otpUtils");

const getAll = async () => {
  return await MODEL.find().populate("programId").populate("classroomId");
};

const getById = async (id) => {
  return await MODEL.findById(id).populate("programId").populate("classroomId");
};

const add = async (data) => {
  console.log(data)
  const newItem = new MODEL(data);
  return await newItem.save();
};

const update = async (id, data) => {
  return await MODEL.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
  return await MODEL.findByIdAndDelete(id);
};

const search = async (req) => {
  console.log(req.query);
  return await MODEL.find({
    $or: [
      { name: { $regex: req.query.query, $options: "i" } },
      { LRN: { $regex: req.query.query, $options: "i" } },
    ],
  }).limit(10);
};

//Auth
const initiateLogin = async (studentId, email) => {
  console.log(studentId, email)
  const student = await MODEL.findOne({ StudentIdNo: studentId });

  if (!student) {
    return { status: "error", message: "Student not found" };
  }

  if (student.status === "inactive") {
    return { status: "error", message: "Student account is inactive" };
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  student.otp = otp;
  student.otpExpires = otpExpires;
  await student.save();

  await sendOTPEmail(email, otp);

  return { status: "success", message: "OTP sent successfully" };
};

const verifyOTP = async (studentId, otp) => {
  console.log(studentId, otp)
  const student = await MODEL.findOne({ StudentIdNo: studentId });
  console.log(student)

  if (!student) {
    return { status: "error", message: "Student not found" };
  }

  if (student.otp !== otp) {
    return { status: "error", message: "Invalid OTP" };
  }

  if (new Date() > student.otpExpires) {
    return { status: "error", message: "OTP has expired" };
  }

  student.otp = undefined;
  student.otpExpires = undefined;
  await student.save();

  return { status: "success", message: "Login successful" };
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  search,
  initiateLogin,
  verifyOTP,
};
