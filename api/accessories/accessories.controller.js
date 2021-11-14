const{create_accessories,get_accessories,get_accessoriesbyid,update_accessories,delete_accessories}=require("./accessories.service");
module.exports={
    create_accessories: (req,res)=>{
        const body=req.body;
        create_accessories(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results!=0){
                return res.status(200).json({
                    success:1,
                    data:results+" "+"Accessory Created Successfully."
                });
            }
        });
    },
    get_accessoriesbyid:(req,res)=>{
        let id=req.params.id;
        // console.log(id,"id");
        get_accessoriesbyid(id,(err,results)=>{
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
    get_accessories: (req,res)=>{
        let id=req.params.id;
        // console.log(id,"id");
        get_accessories(id,(err,results)=>{
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
    update_accessories:(req,res)=>{
        const body=req.body;
        update_accessories(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'Accessory Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    delete_accessories:(req,res)=>{
        let id=req.params.id;
        delete_accessories(id,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                
                return res.status(200).json({
                    success:1,
                    data:results+" "+"Accessory Deleted Successfully."
                });
            }
        })
    },
}