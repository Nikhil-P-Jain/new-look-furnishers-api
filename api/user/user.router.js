const{createUser,getUser,getUserbyid,updateUser,deleteUser, getuser_name}=require("./user.controller");
const router=require("express").Router();
router.post("/createuser",createUser);
router.get("/getuser",getUser);
router.get("/getuserbyid/:id",getUserbyid);
router.patch("/updateuser",updateUser);
router.delete("/deleteuser/:id",deleteUser);
router.get("/getuser_name",getuser_name);
module.exports=router;