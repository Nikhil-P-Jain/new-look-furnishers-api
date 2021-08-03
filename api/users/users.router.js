const{createUser,getUsersbyid,getUsers,updateUsers,deleteUsers,login}=require("./users.controller");
const router=require("express").Router();
const{checkToken}=require("../../auth/token_validation");
router.post("/createusers",checkToken,createUser);
router.get("/getusers",checkToken,getUsers);
router.get("/getusersbyid/:id",checkToken,getUsersbyid);
router.patch("/updateusers",checkToken,updateUsers);
router.delete("/deleteusers",checkToken,deleteUsers);
router.post("/login",login);
module.exports=router;