const{createProject_quotation,updateProject_quotation,getpqdetailsbyid,getProject_quotation,getProject_quotationbyid,deleteProject_quotation}=require("./project_quotation.service");
module.exports={
    createProject_quotation:(req,res)=>{
        const body=req.body;
//         let prod_id= JSON.stringify(body.product_id);
//         let start =prod_id.replace("[","");
//         body.product_id= start.replace("]","");
        createProject_quotation(body,(err,results)=>{
            console.log(body,"body");
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                
                return res.status(200).json({
                    success:1,
                    data:results+" "+"Project_quotation Created Successfully."
                });
            }
        })
    },
    getProject_quotationbyid:(req,res)=>{
        let id=req.params.id;
        getProject_quotationbyid(id,(err,results)=>{
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
    getpqdetailsbyid:(req,res)=>{
        let id=req.params.id;
        getpqdetailsbyid(id,(err,results)=>{
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
    getProject_quotation: (req,res)=>{
        getProject_quotation((err,results)=>{
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
    updateProject_quotation:(req,res)=>{
        const body=req.body;
//         let prod_id= JSON.stringify(body.product_id);
//         let start =prod_id.replace("[","");
//         body.product_id= start.replace("]","");
        updateProject_quotation(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Project_quotation Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteProject_quotation:(req,res)=>{
        let id=req.params.id;
        deleteProject_quotation(id,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:'Database Connection error!!'
                }) 
            }
            if(results != 0){
                return res.status(200).json({
                    success:1,
                    message:results+" "+'Project_quotation Deleted Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },

}