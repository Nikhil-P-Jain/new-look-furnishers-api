const{createProject_quotation_updates,getProject_quotation_updates,getProject_quotation_updatesbyid,updateProject_quotation_updates,deleteProject_quotation_updates}=require("./project_quotation_updates.controller");
const router=require("express").Router();
router.post("/createproject_quotation_updates",createProject_quotation_updates);
router.get("/getproject_quotation_updates/:id",getProject_quotation_updates);
router.get("/getproject_quotation_updatesbyid/:id",getProject_quotation_updatesbyid);
router.patch("/updateproject_quotation_updates",updateProject_quotation_updates);
router.delete("/deleteproject_quotation_updates/:id",deleteProject_quotation_updates);
module.exports=router;