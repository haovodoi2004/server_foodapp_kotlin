var express = require('express');
var router = express.Router();
const modelUser=require('../model/user')
const UserOTPVerification = require('../model/UserOTPVerification')
require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = require('../nodemailer')
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getlistuser',async(req,res)=>{
  const result =await modelUser.find({})
  try {
    res.send(result)
  } catch (error) {
    console.log('lỗi khi hiện danh sách user ' +error);
    
  }
})

// Định nghĩa route đăng nhập
// Đoạn mã xác thực trong router
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      // Tìm người dùng dựa trên email
      const user = await modelUser.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Kiểm tra mật khẩu đã nhập với mật khẩu đã mã hóa
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});


router.post('/adduser',async(req,res)=>{
  try{
    const model=new modelUser(req.body)
    const result=await model.save()
    if (result){
      res.json({
        "status":200,
        "message":"thêm thành công",
        "data":result
      })
    }else{
      res.json({
        "status":400,
        "message":"them that bai",
        "data":[]
      })
    }
  }catch(err){
 console.log("loi khi them user: "+err);
 
  }
})

router.get('/getbyemailuser/:email',async(req,res)=>{
  const result=await modelUser.findOne({email:req.params.email})
  try {
    if(result){
      res.send(result)
    }else{
      res.json({
        "status":400,
        "message":"tim kiem user that bai",
        "data": []
      })
    }
  } catch (error) {
    console.log("loi khi tim kiem user "+error);
    
  }
})

router.put('/edituser/:id',async(req,res)=>{
  try {
    const result=await modelUser.findOneAndUpdate(
      {_id:req.params.id},req.body
    )
    if(result){
      await result.save()
      res.send(result)
    }else{
      res.json({
        "status":404,
        "message":"ko tim thay id user de sua",
        "data":[]
      })
    }
  } catch (error) {
    console.log("lỗi khi cập nhập user "+error);
    
  }
})

router.delete('/deleteuser/:id',async (req,res)=>{
  try {
    const result=await modelUser.findOneAndDelete({_id:req.params.id})
    if(result){
      res.json({
        "status":200,
        "message":"xoa thanh con user",
        "data":result
      })
    }else{
      res.json({
        "status":400,
        "message":"xoa that bai user",
        "data":[]
      })
    }
  } catch (error) {
    console.log("loi khi xoa user "+error);
    
  }
})

// Định nghĩa route cho việc gửi mã OTP
router.post('/sendOTPVerificationEmail', async (req, res) => {
  try {
    const {  email } = req.body; // Lấy userId và email từ request body
    if ( !email) {
      return res.status(400).json({ message: "Thiếu thông tin userId hoặc email." });
    }
    
    // Gọi hàm sendOTPVerificationEmail để gửi OTP
    await sendOTPVerificationEmail({  email }, res);
  } catch (error) {
    res.status(500).json({ status: "FAILED", message: error.message });
  }
});


const sendOTPVerificationEmail = async ({ email }, res) => {
  try {
    console.log("Bắt đầu gửi OTP cho:", email);

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log("OTP được tạo:", otp);

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    console.log("OTP được băm:", hashedOTP);
    await UserOTPVerification.deleteOne({ email });
    const newOTPVerification = new UserOTPVerification({
      otp: hashedOTP,
      createAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 giờ
      email: email
    });
    await newOTPVerification.save();
    console.log("OTP đã lưu vào database.");

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Đặt lại mật khẩu - Mã OTP",
      html: `
        <p>Chào bạn,</p>
        <p>Vui lòng nhập mã OTP sau vào ứng dụng để đặt lại mật khẩu:</p>
        <h2>${otp}</h2>
        <p>Mã này sẽ hết hạn trong 1 giờ.</p>
      `,
    };

    console.log("Bắt đầu gửi email...");
    await transporter.sendMail(mailOptions);

    res.json({
      status: "PENDING",
      message: "Mã OTP đã được gửi đến email.",
      data: { email },
    });
  } catch (error) {
    console.error("Lỗi khi gửi OTP:", error.message);
    res.status(500).json({ status: "FAILED", message: error.message });
  }
};


router.post("/verifyOTP", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Kiểm tra nếu thiếu email hoặc OTP
    if (!email || !otp) {
      return res.status(400).json({
        status: "FAILED",
        message: "Thiếu thông tin email hoặc OTP.",
      });
    }

    // Tìm bản ghi OTP theo email
    const userOTPVerificationRecords = await UserOTPVerification.find({ email });

    if (userOTPVerificationRecords.length <= 0) {
      return res.status(404).json({
        status: "FAILED",
        message: "Mã OTP không tồn tại hoặc đã được sử dụng.",
      });
    }

    // Lấy thông tin từ bản ghi đầu tiên
    const { expiresAt, otp: hashedOTP } = userOTPVerificationRecords[0];

    // Kiểm tra nếu OTP đã hết hạn
    if (expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ email });
      return res.status(400).json({
        status: "FAILED",
        message: "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.",
      });
    }

    // Kiểm tra nếu OTP hợp lệ
    const validOTP = await bcrypt.compare(otp, hashedOTP);

    if (!validOTP) {
      return res.status(400).json({
        status: "FAILED",
        message: "Mã OTP không đúng. Vui lòng kiểm tra lại.",
      });
    }

    // Nếu OTP hợp lệ, trả về kết quả thành công ngay lập tức
    return res.status(200).json({
      status: "VERIFIED",
      message: "Mã OTP hợp lệ. Bạn có thể tiếp tục đổi mật khẩu.",
    });
  } catch (error) {
    // Xử lý lỗi chung
    console.error("Lỗi khi xử lý OTP:", error);
    return res.status(500).json({
      status: "FAILED",
      message: "Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.",
    });
  }
});


router.post("/resetPassword", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      throw new Error("Thiếu thông tin userId hoặc mật khẩu mới.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.updateOne({ _id: userId }, { password: hashedPassword });
    await UserOTPVerification.deleteMany({ userId });

    res.json({
      status: "SUCCESS",
      message: "Đổi mật khẩu thành công. Bạn có thể đăng nhập với mật khẩu mới.",
    });
  } catch (error) {
    res.json({ status: "FAILED", message: error.message });
  }
});

module.exports = router;
