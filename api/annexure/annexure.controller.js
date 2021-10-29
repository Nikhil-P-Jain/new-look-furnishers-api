const{createAnnexure,getAnnexurebyid,getAnnexure,updateAnnexure,deleteAnnexure,getAnnexureby_poid}=require("./annexure.service");
module.exports={
    createAnnexure: (req,res)=>{
        const body=req.body;
        createAnnexure(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Annexure Created Successfully."
                });
            }
        });
    },
    getAnnexurebyid:(req,res)=>{
        let id=req.params.id;
        getAnnexurebyid(id,(err,results)=>{
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
    getAnnexure: (req,res)=>{
        getAnnexure((err,results)=>{
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
    updateAnnexure:(req,res)=>{
        const body=req.body;
        updateAnnexure(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Annexure Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteAnnexure:(req,res)=>{
        let id=req.params.id;
        deleteAnnexure(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.json({
                    success:1,
                    message:"Annexure Deleted Successfully."
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Annexure Deleted Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getAnnexureby_poid:(req,res)=>{
        let id=req.params.id;
        getAnnexureby_poid(id,(err,results)=>{
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