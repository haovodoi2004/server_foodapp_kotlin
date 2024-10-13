const { kMaxLength } = require('buffer')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Users=new Schema({
    email: {type:String,uniqe:true},
    password: {type:String},
    name: {type:String},
    address: {type:String}
},{
    timestamps:true
})
module.exports=mongoose.model('us',Users)