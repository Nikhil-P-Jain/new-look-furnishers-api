const{createProject_quotation,getProject_quotation,getProject_quotationbyid,updateProject_quotation,deleteProject_quotation}=require("./project_quotation.controller");
const router=require("express").Router();
router.post("/createproject_quotation",createProject_quotation);
router.get("/getproject_quotation",getProject_quotation);
router.get("/getproject_quotationbyid/:id",getProject_quotationbyid);
router.patch("/updateproject_quotation",updateProject_quotation);
router.delete("/deleteproject_quotation/:id",deleteProject_quotation);
module.exports=router;