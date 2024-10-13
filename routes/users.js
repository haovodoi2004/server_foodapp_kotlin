var express = require('express');
var router = express.Router();
const modelUser=require('../model/user')

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

router.get('/getbyiduser/:name',async(req,res)=>{
  const result=await modelUser.findOne({name:req.params.name})
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

router.patch('/edituser/:name',async(req,res)=>{
  try {
    const result=await modelUser.findOneAndUpdate(
      {name:req.params.name},req.body
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

router.delete('/deleteuser/:name',async (req,res)=>{
  try {
    const result=await modelUser.findOneAndDelete(req.params.name)
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
module.exports = router;
