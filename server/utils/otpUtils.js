// const nodemailer = require("nodemailer");

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function sendOTPEmail(email, otp) {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "mybakfiles20@gmail.com",
//       pass: "kcuauysxnftdmiav",
//     },
//   });

//   await transporter.sendMail({
//     from: '"Your App Name" <noreply@yourapp.com>',
//     to: email,
//     subject: "Your Login OTP",
//     text: `Your OTP is: ${otp}`,
//     html: `<b>Your OTP is: ${otp}</b>`,
//   });
// }

// module.exports = { generateOTP, sendOTPEmail };

const nodemailer = require("nodemailer");

function generateOTP() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map((num) => num % 10)
    .join("");
}

async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mybakfiles20@gmail.com",
      pass: "kcuauysxnftdmiav",
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .otp-box {
            background-color: #f8f9fa;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            letter-spacing: 2px;
          }
          .warning {
            color: #dc3545;
            font-size: 14px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verify Your Login</h2>
          <p>Hello,</p>
          <p>Your one-time password (OTP) for login verification is:</p>
          <div class="otp-box">
            <strong>${otp}</strong>
          </div>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: {
        name: process.env.MAIL_FROM_NAME || "GITVote",
        address: process.env.MAIL_FROM_ADDRESS || "noreply@git.com",
      },
      to: email,
      subject: "Security Code for Login Verification",
      text: `
        Verify Your Login
        
        Your one-time password (OTP) for login verification is: ${otp}
        
        This OTP will expire in 5 minutes.
      `,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
}

module.exports = { generateOTP, sendOTPEmail };
