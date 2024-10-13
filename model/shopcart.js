const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Shop=new Schema({
    email:{type:String},
    name: {type:String},
    price: {type:Number,min:1},
    avatar: {type:String},
    quantity: {type:Number,min:1},
    all: {type:Number,min:1}
},{
    timestamps:true
})
module.exports=mongoose.model('shopcart',Shop)