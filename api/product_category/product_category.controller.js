const{createProduct_category,updateProduct_category,getProduct_category,getProduct_categorybyid,deleteProduct_category,get_product_category_by_brand_id}=require("./product_category.service");
module.exports={
    createProduct_category:(req,res)=>{
        const body=req.body;
        createProduct_category(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Product_category Created Successfully."
                });
            }
        })
    },
    getProduct_categorybyid:(req,res)=>{
        let id=req.params.id;
        getProduct_categorybyid(id,(err,results)=>{
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
    get_product_category_by_brand_id:(req,res)=>{
        let id=req.params.id;
        get_product_category_by_brand_id(id,(err,results)=>{
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
    getProduct_category: (req,res)=>{
        getProduct_category((err,results)=>{
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
    updateProduct_category:(req,res)=>{
        const body=req.body;
        updateProduct_category(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Product_category Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteProduct_category:(req,res)=>{
        let id=req.params.id;
        deleteProduct_category(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Product_category Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },

}