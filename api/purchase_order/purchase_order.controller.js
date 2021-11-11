const{createpurchase_order,updatepurchase_order,getpurchase_order,getpurchase_orderbyid,deletepurchase_order,getpurchase_orderbyproductid}=require("./purchase_order.service");
module.exports={
    createpurchase_order:(req,res)=>{
        const body=req.body;
        createpurchase_order(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results!=0){
                return res.status(200).json({
                    success:1,
                    data:results+" "+"purchase_order Created Successfully."
                });
            }
        })
    },
    getpurchase_orderbyid:(req,res)=>{
        let id=req.params.id;
        getpurchase_orderbyid(id,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.length == 0){
                return res.status(404).json({
                    success:0,
                    message:"Record Doesn't Exist!!"
                })    
             }
            return res.status(200).json({
                success:1,
                data:{results}
            }) 
        });
    },
    getpurchase_order: (req,res)=>{
        getpurchase_order((err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.length == 0){
                return res.status(404).json({
                    success:0,
                    message:"Record Doesn't Exist!!"
                })    
             }
            return res.status(200).json({
                success:1,
                data:{results}
            }) 
        });
    },
    updatepurchase_order:(req,res)=>{
        const body=req.body;
        updatepurchase_order(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results!= 0){
                return res.status(200).json({
                    success:1,
                    message:results+" "+'purchase_order Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deletepurchase_order:(req,res)=>{
        let id=req.params.id;
        deletepurchase_order(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'purchase_order Deleted Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    // getpurchase_order_name: (req,res)=>{
    //     getpurchase_order_name((err,results)=>{
    //         if(err){
    //             return res.status(500).json({
    //                 success:0,
    //                 message:err
    //             })
    //         }
    //         if(results.length == 0){
    //             return res.status(404).json({
    //                 success:0,
    //                 message:"Record Doesn't Exist!!"
    //             })    
    //          }
    //         return res.status(200).json({
    //             success:1,
    //             data:{results}
    //         }) 
    //     });
    // },
    getpurchase_orderbyproductid:(req,res)=>{
        let id=req.params.id;
        getpurchase_orderbyproductid(id,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.length != 0){
                var qty=0,area=0;
                qty=results[0].purchase_order_specified_product_quantity;
                var an=results[0].annexure;
                if(an && an.length != 0){
                    an.forEach(element => {
                       area = area + parseFloat(element.area); 
                    });
                }
                return res.status(200).json({
                    success:1,
                    qty:qty,
                    area:area,
                    data:{results}
                }) 
             }
             return res.status(404).json({
                success:0,
                message:"Record Doesn't Exist!!"
            })   
        });
    },
}