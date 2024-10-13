var express=require('express')
var modelHistory=require('../model/history')
var router=express.Router()

router.get('/getlisthistory',async (req,res)=>{
    const result=await modelHistory.find({})
    try {
        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
})

router.post('/addhistory',async (req,res)=>{
    try {
        const model=new modelHistory(req.body)
        const result=await model.save()
        if(result){
            res.json({
                "status":200,
                "message": "them thanh cong lich su mua hang",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"them that bai lich su mua hang",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi them lich su mua hang "+error);
        
    }
})

router.get('/getbyidhistory/:id/:email',async(req,res)=>{
    try {
        const result=await modelHistory.findOne({
            _id: req.params.id,    // Điều kiện khớp ID
      email: req.params.email  // Điều kiện khớp name
        })
        if(result){
            res.send(result)
        }else{
            res.json({
                "status":404,
                "message":"ko tim thay id history",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi truy van history "+error);
        
    }
})

router.patch('/edithistory/:id/:email',async(req,res)=>{
    try {
      const result=await modelHistory.findOneAndUpdate(
        {_id:req.params.id,email:req.params.email},req.body
      )
      if(result){
        res.json({
            "status":200,
            "message":"cập nhật thành công lịch sử mua hàng",
            "data":result
          })
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

  router.delete('/deletehistory/:id/:email',async(req,res)=>{
    try {
        const result=await modelHistory.findOneAndDelete({
            _id:req.params.id,email:req.params.email
        })
        if(result){
            res.json({
                "status":200,
                "message":"xoa thanh cong history",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"xoa that bai lich su mua hang",
                "data":[]
            })
        }

    } catch (error) {
        console.log("xoa that bai lich su mua hang "+error);
        
    }
  })
  module.exports = router;