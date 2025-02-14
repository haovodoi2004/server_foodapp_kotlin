var express =require('express')
const modelNew=require('../model/news')
var router=express.Router()

/* GET users listing. */
router.get('/get', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/getlistnew',async(req,res)=>{
    const result=await modelNew.find({})
    try{
        res.send(result)
    } catch(err){
        console.log(err);
        
    }
})

router.post('/addnew',async(req,res)=>{
    try {
        const { _id, ...newData } = req.body;
        const model=new modelNew(newData)
        const result=await model.save()
        if(result){
            res.json({
                "status":200,
                "message":"them thanh cong product",
                "data": result
            })
        }else{
            res.json({
                "status":400,
                "message": "them that bai product",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi them product "+error);
        
    }
})

router.get('/getbyidnew/:id',async(req,res)=>{
    try {
        const result=await modelNew.findById({
            _id: req.params.id,    // Điều kiện khớp ID
       // Điều kiện khớp name
        })
        if(result){
            res.send(result)
        }else{
            res.json({
                "status":404,
                "message":"ko tim thay id product",
                "data":[]
            })
        }
    } catch (error) {
        console.log("loi khi truy van product "+error);
    
    }
})

router.put('/editnew/:id',async(req,res)=>{
    try {
      const result=await modelNew.findOneAndUpdate(
        {_id:req.params.id},req.body
      )
      if(result){
        res.json({
            "status":200,
            "message":"cập nhật thành công sản phẩm",
            "data":result
          })
      }else{
        res.json({
          "status":404,
          "message":"ko tim thay id sản phẩm de sua",
          "data":[]
        })
      }
    } catch (error) {
      console.log("lỗi khi cập nhập sản phẩm "+error);
      
    }
  })

  router.delete('/deletenew/:id',async(req,res)=>{
    try {
        const result=await modelNew.findOneAndDelete({
            _id:req.params.id
        })
        if(result){
            res.json({
                "status":200,
                "message":"xoa thanh cong product",
                "data":result
            })
        }else{
            res.json({
                "status":400,
                "message":"xoa that bai product",
                "data":[]
            })
        }

    } catch (error) {
        console.log("xoa that bai product "+error);
        
    }
  })
module.exports=router