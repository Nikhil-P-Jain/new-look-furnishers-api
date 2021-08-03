const{createPermission,getPermission,getPermissionbyid,updatePermission,deletePermission,getRoleName}=require("./permission.controller");
const router=require("express").Router();
router.post("/createpermission",createPermission);
router.get("/getpermission",getPermission);
router.get("/getpermissionbyid/:id",getPermissionbyid);
router.patch("/updatepermission",updatePermission);
router.delete("/deletepermission/:id",deletePermission);
router.get("/getrolename",getRoleName);
module.exports=router;