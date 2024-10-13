const express=require('express')
const modelOder=require('../model/oder')
const router=express.Router()

router.get('/getlistoder',async(req,res)=>{
    const result=await modelOder.find({})
    try {
        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
})

router.post('/addoder',async(req,res)=>{
    try {
        const model=new modelOder(req.body)
        const result=await model.save()
        if(result){
            res.json({
                "status":200,
                "message":"them oder thanh cong",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"them oser that bai",
                "data":[]
            })
        }
    } catch (error) {
        console.log("them oder that bai "+error);
        
    }
})

router.get('/getbyidoder/:id/:email',async(req,res)=>{
    try {
        const result=await modelOder.findOne({
            _id: req.params.id,    // Điều kiện khớp ID
      email: req.params.email  // Điều kiện khớp name
        })
        if(result){
            res.send(result)
        }else{
            res.json({
                "status":404,
                "message":"ko tim thay id shopcart",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi truy van oder "+error);
    }
})

router.patch('/editoder/:id/:email',async(req,res)=>{
    try {
      const result=await modelOder.findOneAndUpdate(
        {_id:req.params.id,email:req.params.email},req.body
      )
      if(result){
        res.json({
            "status":200,
            "message":"cập nhật thành công đặt hàng",
            "data":result
          })
      }else{
        res.json({
          "status":404,
          "message":"ko tim thay id oder de sua",
          "data":[]
        })
      }
    } catch (error) {
      console.log("lỗi khi cập nhập oder "+error);
      
    }
  })

  router.delete('/deleteoder/:id/:email',async(req,res)=>{
    try {
        const result=await modelOder.findOneAndDelete({
            _id:req.params.id,email:req.params.email
        })
        if(result){
            res.json({
                "status":200,
                "message":"xoa thanh cong oder",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"xoa that bai oder",
                "data":[]
            })
        }

    } catch (error) {
        console.log("xoa that bai lich su oder "+error);
        
    }
  })
  module.exports=router