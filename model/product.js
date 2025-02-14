const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Product=new Schema({
    name: {type:String},
    price: {type:Number,min:1},
    avatar: {type:String},
    infor: {type:String},
    category: {type:String},
    quantity: {type:Number},
    status:{type:Number}
},{
    timestamps:true
})
module.exports=mongoose.model('product',Product)