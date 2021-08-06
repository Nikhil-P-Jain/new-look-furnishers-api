const{createState,getState,getStatebyid,updateState,deleteState}=require("./state.controller");
const router=require("express").Router();
router.post("/createstate",createState);
router.get("/getstate",getState);
router.get("/getstatebyid/:id",getStatebyid);
router.patch("/updatestate",updateState);
router.delete("/deletestate/:id",deleteState);
module.exports=router;