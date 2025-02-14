const mongoose=require('mongoose')
const { type } = require('os')
const Schema=mongoose.Schema

const Oder=new Schema({
    name: {type:String},
    phone: {type:String},
    id_pro: {type:String},
    quantity: {type:Number,min:1},
    all: {type:Number,min:1},
    address: {type:String},
    status:{type:Number},
    date:{type:String},
    emailuser:{type:String}
},{
    timestamps:true
})

module.exports=mongoose.model('oder',Oder)