var express=require('express')
const modelShop=require("../model/shopcart")
var router=express.Router()

router.get('/getlistshopcart',async (req,res)=>{
    const result=await modelShop.find({})
    try {
        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
})

router.post('/addshopcart',async(req,res)=>{
    try {
        const model=new modelShop(req.body)
        const result=await model.save()
        if(result){
            res.json({
                "status":200,
                "message":"them thanh cong gio hang",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"them that bai gio hang",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi them gio hang "+error);
        
    }
})

router.get('/getbyidshopcart/:id/:email',async(req,res)=>{
    try {
        const result=await modelShop.findOne({
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
        console.log("loi khi truy van shopcart "+error);
        
    }
})

router.patch('/editshopcart/:id/:email',async(req,res)=>{
    try {
      const result=await modelShop.findOneAndUpdate(
        {_id:req.params.id,email:req.params.email},req.body
      )
      if(result){
        res.json({
            "status":200,
            "message":"cập nhật thành công lịch sử giỏ hàng",
            "data":result
          })
      }else{
        res.json({
          "status":404,
          "message":"ko tim thay id giỏ hàng de sua",
          "data":[]
        })
      }
    } catch (error) {
      console.log("lỗi khi cập nhập giỏ hàng "+error);
      
    }
  })

  router.delete('/deleteshopcart/:id/:email',async(req,res)=>{
    try {
        const result=await modelShop.findOneAndDelete({
            _id:req.params.id,email:req.params.email
        })
        if(result){
            res.json({
                "status":200,
                "message":"xoa thanh cong shopcart",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"xoa that bai shopcart",
                "data":[]
            })
        }

    } catch (error) {
        console.log("xoa that bai shopcart "+error);
        
    }
  })
  module.exports=router