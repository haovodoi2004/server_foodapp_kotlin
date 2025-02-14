const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
   service:"gmail",
  auth: {
    user: process.env.AUTH_EMAIL, // Email nguồn
    pass: process.env.AUTH_PASS,  // App Password
  },
});

// const mailOptions = {
//     from: process.env.AUTH_EMAIL,
//     to: "haoyasou2004@gmail.com",
//     subject: "Test Email",
//     text: "This is a test email from Node.js",
//   };
  
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email: ", error.message);
//     } else {
//       console.log("Email sent: ", info.response);
//     }
//   });

module.exports = transporter;