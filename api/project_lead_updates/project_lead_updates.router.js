const{createProject_lead_updates,getProject_lead_updates,getProject_lead_updatesbyid,updateProject_lead_updates,deleteProject_lead_updates}=require("./project_lead_updates.controller");
const router=require("express").Router();
router.post("/createproject_lead_updates",createProject_lead_updates);
router.get("/getproject_lead_updates/:id",getProject_lead_updates);
router.get("/getproject_lead_updatesbyid/:id",getProject_lead_updatesbyid);
router.patch("/updateproject_lead_updates",updateProject_lead_updates);
router.delete("/deleteproject_lead_updates/:id",deleteProject_lead_updates);
module.exports=router;