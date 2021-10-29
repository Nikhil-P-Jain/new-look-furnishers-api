const{createAnnexure_details,getAnnexure_detailsbyid,getAnnexure_details,updateAnnexure_details,deleteAnnexure_details,getAnnexure_detailsby_annexure_id}=require("./annexure_details.service");
module.exports={
    createAnnexure_details: (req,res)=>{
        const body=req.body;
        createAnnexure_details(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"Annexure_details Created Successfully."
                });
            }
        });
    },
    getAnnexure_detailsbyid:(req,res)=>{
        let id=req.params.id;
        getAnnexure_detailsbyid(id,(err,results)=>{
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
    getAnnexure_details: (req,res)=>{
        getAnnexure_details((err,results)=>{
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
    updateAnnexure_details:(req,res)=>{
        const body=req.body;
        updateAnnexure_details(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Annexure_details Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteAnnexure_details:(req,res)=>{
        let id=req.params.id;
        deleteAnnexure_details(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.json({
                    success:1,
                    message:"Annexure_details Deleted Successfully."
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Annexure_details Deleted Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getAnnexure_detailsby_annexure_id:(req,res)=>{
        let id=req.params.id;
        getAnnexure_detailsby_annexure_id(id,(err,results)=>{
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