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

router.get('/revenue', async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "Vui lòng cung cấp ngày bắt đầu và ngày kết thúc!" });
    }

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Lọc các đơn hàng trong khoảng thời gian
        const orders = await modelOder.find({
            date: {
                $gte: start.toISOString().split('T')[0],
                $lte: end.toISOString().split('T')[0]
            }
        });

        // Tính tổng doanh thu
        const totalRevenue = orders.reduce((sum, order) => sum + (order.all || 0), 0);

        // Trả về danh sách đơn hàng và tổng doanh thu
        res.json({ totalRevenue, orders });
    } catch (error) {
        console.error("Lỗi khi tính doanh thu:", error);
        res.status(500).json({ error: "Lỗi server khi tính doanh thu" });
    }
});


// router.get('/revenue', async (req, res) => {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: "Vui lòng cung cấp ngày bắt đầu và ngày kết thúc!" });
//     }

//     try {
//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         const revenue = await modelOder.aggregate([
//             {
//                 $match: {
//                     date: {
//                         $gte: start.toISOString().split('T')[0],
//                         $lte: end.toISOString().split('T')[0]
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     totalRevenue: { $sum: "$all" }
//                 }
//             }
//         ]);

//         const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;
//         res.json({ totalRevenue });
//     } catch (error) {
//         console.error("Lỗi khi tính doanh thu:", error);
//         res.status(500).json({ error: "Lỗi server khi tính doanh thu" });
//     }
// });

router.post('/addoder',async(req,res)=>{
    try {
        const { _id, ...oderData } = req.body;
        const newOder = new modelOder(oderData);
        const result=await newOder.save()
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

router.get('/getbyidoder/:id',async(req,res)=>{
    try {
        const result=await modelOder.findOne({
            _id: req.params.id,    // Điều kiện khớp ID
    
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

router.put('/editoder/:id',async(req,res)=>{
    try {
      const result=await modelOder.findOneAndUpdate(
        {_id:req.params.id},req.body
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

  router.delete('/deleteoder/:id',async(req,res)=>{
    try {
        const result=await modelOder.findOneAndDelete({
            _id:req.params.id
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