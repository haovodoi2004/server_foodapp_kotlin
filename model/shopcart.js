const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Shop=new Schema({
    phone:{type:String},
    address:{type:String},
    name: {type:String},
    idpro: {type:String},
    quantity: {type:Number,min:1},
    all: {type:Number,min:1},
    status:{type:Number},
    emailuser:{type:String}
},{
    timestamps:true
})
module.exports=mongoose.model('shopcart',Shop)