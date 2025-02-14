var express =require('express')
const modelProduct=require('../model/product')
var router=express.Router()

/* GET users listing. */
router.get('/get', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/getlistproduct',async(req,res)=>{
    const result=await modelProduct.find({})
    try{
        res.send(result)
    } catch(err){
        console.log(err);
        
    }
})

router.post('/addproduct',async(req,res)=>{
    try {
        const { _id, ...productData } = req.body;
        const newProduct = new modelProduct(productData);
        const result=await newProduct.save()
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

router.get('/getbyidproduct/:id',async(req,res)=>{
    try {
        const result = await modelProduct.findOne({ _id: req.params.id });
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

router.get('/getbynameproduct/:name',async(req,res)=>{
    try {
        const result = await modelProduct.find({ name: req.params.name });
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
router.get('/getbycategoryproduct/:category', async (req, res) => {
    try {
        const result = await modelProduct.find({
            category: req.params.category  // Điều kiện khớp category
        });
        
        res.json(result.length > 0 ? result : []);  // Trả về mảng rỗng nếu không có sản phẩm
    } catch (error) {
        console.log("Lỗi khi truy vấn product: " + error);
        res.status(500).json({
            "status": 500,
            "message": "Đã xảy ra lỗi khi truy vấn sản phẩm",
            "error": error.message
        });
    }
});



router.put('/editproduct/:id',async(req,res)=>{
    try {
      const result=await modelProduct.findOneAndUpdate(
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

  router.delete('/deleteproduct/:id',async(req,res)=>{
    try {
        const result=await modelProduct.findOneAndDelete({
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