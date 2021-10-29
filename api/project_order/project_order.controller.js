const{createProject_order,updateProject_order,getProject_order,getProject_orderbyid,deleteProject_order,getproject_lead_name}=require("./project_order.service");
module.exports={
    createProject_order:(req,res)=>{
        const body=req.body;
        createProject_order(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results!=0){
                return res.status(200).json({
                    success:1,
                    data:results+" "+"Project_order Created Successfully."
                });
            }
        })
    },
    getProject_orderbyid:(req,res)=>{
        let id=req.params.id;
        getProject_orderbyid(id,(err,results)=>{
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
    getProject_order: (req,res)=>{
        getProject_order((err,results)=>{
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
    updateProject_order:(req,res)=>{
        const body=req.body;
        updateProject_order(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results!= 0){
                return res.status(200).json({
                    success:1,
                    message:results+" "+'Project_order Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteProject_order:(req,res)=>{
        let id=req.params.id;
        deleteProject_order(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Project_order Deleted Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getproject_lead_name: (req,res)=>{
        getproject_lead_name((err,results)=>{
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
    // getProject_order_name: (req,res)=>{
    //     getProject_order_name((err,results)=>{
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