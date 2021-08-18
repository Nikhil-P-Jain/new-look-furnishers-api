const{createProject_lost_updates,getProject_lost_updates,getProject_lost_updatesbyid,updateProject_lost_updates,deleteProject_lost_updates}=require("./project_lost_updates.controller");
const router=require("express").Router();
router.post("/createproject_lost_updates",createProject_lost_updates);
router.get("/getproject_lost_updates/:id",getProject_lost_updates);
router.get("/getproject_lost_updatesbyid/:id",getProject_lost_updatesbyid);
router.patch("/updateproject_lost_updates",updateProject_lost_updates);
router.delete("/deleteproject_lost_updates/:id",deleteProject_lost_updates);
module.exports=router;