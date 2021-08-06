const{createUnit,getUnit,getUnitbyid,updateUnit,deleteUnit}=require("./unit.controller");
const router=require("express").Router();
router.post("/createunit",createUnit);
router.get("/getunit",getUnit);
router.get("/getunitbyid/:id",getUnitbyid);
router.patch("/updateunit",updateUnit);
router.delete("/deleteunit/:id",deleteUnit);
module.exports=router;