const{createProject_lead,getProject_lead,getProject_leadbyid,updateProject_lead,deleteProject_lead}=require("./project_lead.controller");
const router=require("express").Router();
router.post("/createproject_lead",createProject_lead);
router.get("/getproject_lead",getProject_lead);
router.get("/getproject_leadbyid/:id",getProject_leadbyid);
router.patch("/updateproject_lead",updateProject_lead);
router.delete("/deleteproject_lead/:id",deleteProject_lead);
module.exports=router;