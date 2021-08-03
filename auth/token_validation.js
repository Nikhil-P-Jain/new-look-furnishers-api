const {verify}=require("jsonwebtoken");
module.exports={
    checkToken:(req,res,next)=>{
        let token=req.get("authorization");
        if(token){
            // console.log(token);
            token1=token.slice(7);
            verify(token1,"qwe1234",(err,decoded)=>{
                console.log(err);
                if(err){
                    res.json({
                        success:0,
                        message:"Invalid Token"
                    });
                }
                else{
                    req.decoded=decoded;
                    next();
                }
            });
        }
        else{
            res.json({
                success:0,
                message:"Access Denied! Unauthrized user."
            });
        }
    }
}
