const mongoose=require('mongoose')
const { type } = require('os')
const Schema=mongoose.Schema

const News=new Schema({
    title: {type:String},
    content: {type:String},
    avatar: {type:String},
    
},{
    timestamps:true
})

module.exports=mongoose.model('new',News)