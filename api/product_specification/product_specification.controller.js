const{createProductSpecification,updateProductSpecification,getProductSpecification,getProductSpecificationbyid,deleteProductSpecification,getProductSpecificationbyproductid}=require("./product_specification.service");
module.exports={
    createProductSpecification:(req,res)=>{
        const body=req.body;
        createProductSpecification(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Product Specification Created Successfully."
                });
            }
        })
    },
    getProductSpecificationbyid:(req,res)=>{
        let id=req.params.id;
        getProductSpecificationbyid(id,(err,results)=>{
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
    getProductSpecification: (req,res)=>{
        getProductSpecification((err,results)=>{
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
    updateProductSpecification:(req,res)=>{
        const body=req.body;
        updateProductSpecification(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Product Specification Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteProductSpecification:(req,res)=>{
        let id=req.params.id;
        deleteProductSpecification(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Product Specification Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getProductSpecificationbyproductid:(req,res)=>{
        let id=req.params.id;
        getProductSpecificationbyproductid(id,(err,results)=>{
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

}