const MODEL = require("../models/studentModel");
const { generateOTP, sendOTPEmail } = require("../utils/otpUtils");
const axios = require("axios");

const getAll = async () => {
  return await MODEL.find()
    .populate("programId")
    .populate("classroomId")
    .sort({ _id: -1 });
};

const getById = async (id) => {
  return await MODEL.findOne({ StudentIdNo: id })
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

const sendOTPSMS = async (phoneNumber, otp) => {
  try {
    const message = `GIT Vote login OTP is: ${otp}. Valid for 5 minutes.`;

    const response = await axios.post(
      `${process.env.PHILSMS_API_URL}`,
      {
        recipient: phoneNumber,
        sender_id: process.env.SENDER_ID,
        type: "plain",
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PHILSMS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    return { success: true, data: response.data };
  } catch (error) {
    console.error("SMS sending error:", error);
    throw new Error("Failed to send SMS OTP");
  }
};

const initiateLogin = async (studentId, password, email, otpMethod) => {
  try {
    const student = await MODEL.findOne({ StudentIdNo: studentId });

    if (!student) {
      return { status: "error", message: "Student not found" };
    }

    if (student.status === "inactive") {
      return { status: "error", message: "Student account is inactive" };
    }

    if (otpMethod === "sms" && !student.phoneNo) {
      return {
        status: "error",
        message:
          "Phone number not found. Please use email method or update your phone number.",
      };
    }

    if (otpMethod === "email" && !student.email) {
      return {
        status: "error",
        message: "Email not found. Please use SMS method or update your email.",
      };
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    student.otp = otp;
    student.otpExpires = otpExpires;
    student.otpMethod = otpMethod;
    await student.save();

    if (otpMethod === "sms") {
      await sendOTPSMS(student.phoneNo, otp);
      return {
        status: "success",
        message: "OTP sent successfully via SMS",
        student: { id: student._id },
        showOtp: true,
        method: "sms",
      };
    } else {
      await sendOTPEmail(student.email, otp);
      return {
        status: "success",
        message: "OTP sent successfully via email",
        student: { id: student._id },
        showOtp: true,
        method: "email",
      };
    }
  } catch (error) {
    console.error("Error in initiateLogin:", error);
    return {
      status: "error",
      message: `Failed to send OTP via ${otpMethod}. Please try again.`,
    };
  }
};

const verifyOTP = async (studentId, otp) => {
  try {
    const student = await MODEL.findOne({ StudentIdNo: studentId });

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
    student.otpMethod = undefined;
    await student.save();

    return {
      status: "success",
      message: "Login successful",
      student: {
        id: student._id,
        email: student.email,
        phoneNo: student.phoneNo,
      },
    };
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return {
      status: "error",
      message: "Verification failed. Please try again.",
    };
  }
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
