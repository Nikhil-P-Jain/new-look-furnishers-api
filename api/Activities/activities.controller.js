const{createActivities,getActivitiesbyid,getActivities,updateActivities,deleteActivities}=require("./activities.service");
module.exports={
    createActivities: (req,res)=>{
        const body=req.body;
        createActivities(body,(err,results)=>{
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
    getActivitiesbyid:(req,res)=>{
        let id=req.params.id;
        getActivitiesbyid(id,(err,results)=>{
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
                data:{result}
            })
        });
    },
    getActivities: (req,res)=>{
        getActivities((err,results)=>{
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
    updateActivities:(req,res)=>{
        const body=req.body;
        updateActivities(body,(err,results)=>{
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
    deleteActivities:(req,res)=>{
        let id=req.params.id;
        deleteActivities(id,(err,results)=>{
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
}