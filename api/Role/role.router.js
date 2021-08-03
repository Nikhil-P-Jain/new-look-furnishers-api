const{createRole,getRole,getRolebyid,updateRole,deleteRole}=require("./role.controller");
const router=require("express").Router();
router.post("/createrole",createRole);
router.get("/getrole",getRole);
router.get("/getrolebyid/:id",getRolebyid);
router.patch("/updaterole",updateRole);
router.delete("/deleterole/:id",deleteRole);
module.exports=router;