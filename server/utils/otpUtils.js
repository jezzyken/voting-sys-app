const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mybakfiles20@gmail.com",
      pass: "kcuauysxnftdmiav",
    },
  });

  await transporter.sendMail({
    from: '"Your App Name" <noreply@yourapp.com>',
    to: email,
    subject: "Your Login OTP",
    text: `Your OTP is: ${otp}`,
    html: `<b>Your OTP is: ${otp}</b>`,
  });
}

module.exports = { generateOTP, sendOTPEmail };
