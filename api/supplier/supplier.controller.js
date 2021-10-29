const{createSupplier,updateSupplier,getSupplier,getSupplierbyid,deleteSupplier,getSupplier_name}=require("./supplier.service");
module.exports={
    createSupplier:(req,res)=>{
        const body=req.body;
        createSupplier(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Vendor Created Successfully."
                });
            }
        })
    },
    getSupplierbyid:(req,res)=>{
        let id=req.params.id;
        getSupplierbyid(id,(err,results)=>{
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
    getSupplier: (req,res)=>{
        getSupplier((err,results)=>{
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
    updateSupplier:(req,res)=>{
        const body=req.body;
        updateSupplier(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Vendor Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteSupplier:(req,res)=>{
        let id=req.params.id;
        deleteSupplier(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Vendor Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    // getSupplier_name: (req,res)=>{
    //     getSupplier_name((err,results)=>{
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