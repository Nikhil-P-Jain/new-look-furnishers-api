const{createpurchase_order,updatepurchase_order,getpurchase_order,getpurchase_orderbyid,deletepurchase_order,getpurchase_order_name}=require("./purchase_order.service");
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
}