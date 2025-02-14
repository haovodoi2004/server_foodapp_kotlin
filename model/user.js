const { kMaxLength } = require('buffer')
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const Schema=mongoose.Schema

const Users=new Schema({
    email: {type:String,unique:true},
    password: {type:String},
    name: {type:String},
    address: {type:String},
    sex:{type:Number},
    status:{type:Number}
},{
    timestamps:true
})
Users.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  // Middleware để mã hóa mật khẩu trước khi lưu
Users.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports=mongoose.model('us',Users)