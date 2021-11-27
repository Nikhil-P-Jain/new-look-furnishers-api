const{createUser,updateUser,getUser,getUserbyid,deleteUser,getuser_name,getUsersbyEmail,chnagepassword}=require("./user.service");
const{genSaltSync,hashSync, compareSync}=require("bcrypt");
const{sign}=require("jsonwebtoken");

module.exports={
    createUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        //const pwd=body.password;
        // console.log(pwd,"pwd");
        body.password=hashSync(body.password,salt);
        // console.log(body,"body");
        createUser(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }
            if(results.affectedRows!=0){
                return res.status(200).json({
                    success:1,
                    data:results.affectedRows+" "+"User Created Successfully."
                });
            }
        })
    },
    getUserbyid:(req,res)=>{
        let id=req.params.id;
        getUserbyid(id,(err,results)=>{
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
    getUser: (req,res)=>{
        getUser((err,results)=>{
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
    updateUser:(req,res)=>{
        const body=req.body;
        // const salt=genSaltSync(10);
        // body.password=hashSync(body.password,salt);
        console.log(body);
        updateUser(body,(err,results)=>{
            console.log(results,"resils");
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                })
            }
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'User Updated Successfully!'
                })
            }
            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    deleteUser:(req,res)=>{
        let id=req.params.id;
        deleteUser(id,(err,results)=>{
            if(results.affectedRows != 0){
                return res.status(200).json({
                    success:1,
                    message:results.affectedRows+" "+'User Deleted Successfully!'
                })
            }

            return res.status(404).json({
                success:1,
                message:'Something went wrong! Please try again!'
            })
        });
    },
    getuser_name: (req,res)=>{
        getuser_name((err,results)=>{
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
    login:(req,res)=>{
        console.log("nnn");
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
                results.jsontoken=sign({result:results},"qwe1234",{
                    expiresIn:"2h"
                });
                return res.json({
                    success:1,
                    message:"Logged In Successfully",
                    data:results
                });
            }
            else{
                return res.json({
                    success:0,
                    message:"Invalid Email or Password"
                });
            }
        });
    },
    // chnagepassword:(req,res)=>{
    //     const body=req.body;
    //     const salt=genSaltSync(10);
    //     body.password=hashSync(body.password,salt);
    //     chnagepassword(body,(err,results)=>{
    //         if(err){
    //             return res.status(500).json({
    //                 success:0,
    //                 message:err
    //             })
    //         }
    //         if(results.affectedRows != 0){
    //             return res.status(200).json({
    //                 success:1,
    //                 message:results.affectedRows+" "+'Password Changed Successfully!'
    //             })
    //         }
    //         return res.status(404).json({
    //             success:1,
    //             message:'Something went wrong! Please try again!'
    //         })
    //     })
    // }
}