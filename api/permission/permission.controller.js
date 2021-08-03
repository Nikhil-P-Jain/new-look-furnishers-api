const{createPermission,getPermissionbyid,getPermission,updatePermission,deletePermission,getRoleName}=require("./permission.service");
module.exports={
    createPermission: (req,res)=>{
        const body=req.body;
        createPermission(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Permission Created Successfully."
                });
            }
        });
    },
    getPermissionbyid:(req,res)=>{
        let id=req.params.id;
        getPermissionbyid(id,(err,results)=>{
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
    getPermission: (req,res)=>{
        getPermission((err,results)=>{
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
    updatePermission:(req,res)=>{
        const body=req.body;
        updatePermission(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Permission Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deletePermission:(req,res)=>{
        let id=req.params.id;
        deletePermission(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.json({
                    success:1,
                    message:"Permission Deleted Successfully."
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Permission Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getRoleName: (req,res)=>{
        getRoleName((err,results)=>{
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