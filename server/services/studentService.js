const MODEL = require("../models/studentModel");
const { generateOTP, sendOTPEmail } = require("../utils/otpUtils");

const getAll = async () => {
  return await MODEL.find()
    .populate("programId")
    .populate("classroomId")
    .sort({ _id: -1 });
};

const getById = async (id) => {
  return await MODEL.findById(id)
    .populate("programId")
    .populate("classroomId")
    .sort({ _id: -1 });
};

const add = async (data) => {
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
const initiateLogin = async (studentId, password, email) => {
  console.log(studentId, password, email);

  const student = await MODEL.findOne({ StudentIdNo: studentId });

  console.log(student)

  if (!student) {
    return { status: "error", message: "Student not found" };
  }

  if (student.status === "inactive") {
    return { status: "error", message: "Student account is inactive" };
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  student.otp = otp;
  student.otpExpires = otpExpires;
  await student.save();

  console.log(student)

  await sendOTPEmail(student.email, otp);

  // Check if the password matches
  // if (student.password !== password) {
  //   return { status: "error", message: "Incorrect password" };
  // }

  return {
    status: "success",
    message: "OTP sent successfully",
    student: { id: student._id },
    showOtp: true
  };
};

const verifyOTP = async (studentId, otp) => {
  console.log(studentId, otp);
  const student = await MODEL.findOne({ StudentIdNo: studentId });
  console.log(student);

  if (!student) {
    console.log({message: "Student not found"})
    return { status: "error", message: "Student not found" };
  }

  if (student.otp !== otp) {
    console.log({ message: "Invalid OTP" })
    return { status: "error", message: "Invalid OTP" };
  }

  if (new Date() > student.otpExpires) {
    console.log({message: "OTP has expired" })
    return { status: "error", message: "OTP has expired" };
  }

  student.otp = undefined;
  student.otpExpires = undefined;
  await student.save();

  return { status: "success", message: "Login successful", student: { id: student._id },};
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
