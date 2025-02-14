const { create } = require("hbs")
const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  createAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  email: { type: String, required: true },  // Nếu bạn cần lưu email
});
  
const UserOTPVerification=mongoose.model(
    "UserOTPVerification",
    UserSchema
)
module.exports=UserOTPVerification