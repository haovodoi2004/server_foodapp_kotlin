const mongoose=require('mongoose')
const { type } = require('os')
const Schema=mongoose.Schema

const Oder=new Schema({
    email: {type:String},
    name: {type:String},
    price: {type:Number,min:1},
    avatar: {type:String},
    quantity: {type:Number,min:1},
    all: {type:Number,min:1},
    address: {type:String},
    number: {type:String}
},{
    timestamps:true
})

module.exports=mongoose.model('oder',Oder)