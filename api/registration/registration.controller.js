const{create,getUsersbyid,getUsers,updateUsers,deleteUsers,getUsersbyEmail}=require("./registration.service");
const{genSaltSync,hashSync, compareSync}=require("bcrypt");
const{sign}=require("jsonwebtoken");
module.exports={
    createUser: (req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database Connection Error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
    getUsersbyid:(req,res)=>{
        const id=req.params.id;
        getUsersbyid(id,(err,results)=>{
            if(err){
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record(s) not found."
                })
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getUsers: (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return
            }
            return res.json({
                success:1,
                data:results
            }); 
        });
    },
    updateUsers:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUsers(body,(err,results)=>{
            if(err){
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Failed to Update"
                });
            }
            return res.json({
                success:1,
                message:"Updated Successfully"
            });
        });
    },
    deleteUsers:(req,res)=>{
        const body=req.body;
        deleteUsers(body,(err,results)=>{
            if(err){
                console.log(err);
                return
            }
            // if(!results){
            //     return res.json({
            //         success:0,
            //         message:"Record(s) not found."
            //     })
            // }
            return res.json({
                success:1,
                message:"User Deleted Successfully."
            });
        });
    },
    login:(req,res)=>{
        // console.log("nnn");
        const body=req.body;
        getUsersbyEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Invalid Mail or Password"
                });
            }
            const result=compareSync(body.password,results.password);
            if(result){
                results.password=undefined;
                const jsontoken=sign({result:results},"qwe1234",{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"Logged In Successfully",
                    data:{results},
                    token:jsontoken
                });
            }
            else{
                return res.json({
                    success:0,
                    message:"Invalid Email or Password"
                });
            }
        });
    }
}