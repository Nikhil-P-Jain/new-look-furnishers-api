const{createProject_quotation_updates,updateProject_quotation_updates,getProject_quotation_updates,getProject_quotation_updatesbyid,deleteProject_quotation_updates}=require("./project_quotation_updates.service");
module.exports={
    createProject_quotation_updates:(req,res)=>{
        const body=req.body;
        createProject_quotation_updates(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Project_quotation_updates Created Successfully."
                });
            }
        })
    },
    getProject_quotation_updatesbyid:(req,res)=>{
        let id=req.params.id;
        getProject_quotation_updatesbyid(id,(err,results)=>{
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
    getProject_quotation_updates: (req,res)=>{
        let id=req.params.id;
        getProject_quotation_updates(id,(err,results)=>{
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
    updateProject_quotation_updates:(req,res)=>{
        const body=req.body;
        updateProject_quotation_updates(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Project_quotation_updates Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteProject_quotation_updates:(req,res)=>{
        let id=req.params.id;
        deleteProject_quotation_updates(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Project_quotation_updates Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },

}