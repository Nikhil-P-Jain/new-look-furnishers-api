const{createActivities,getActivities,getActivitiesbyid,updateActivities,deleteActivities}=require("./activities.controller");
const router=require("express").Router();
router.post("/createactivities",createActivities);
router.get("/getactivities",getActivities);
router.get("/getactivitiesbyid/:id",getActivitiesbyid);
router.patch("/updateactivities",updateActivities);
router.delete("/deleteactivities/:id",deleteActivities);
module.exports=router;