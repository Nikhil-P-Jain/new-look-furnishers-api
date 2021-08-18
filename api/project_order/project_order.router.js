const{createProject_order,getProject_order,getProject_orderbyid,updateProject_order,deleteProject_order}=require("./project_order.controller");
const router=require("express").Router();
router.post("/createproject_order",createProject_order);
router.get("/getproject_order",getProject_order);
router.get("/getproject_orderbyid/:id",getProject_orderbyid);
router.patch("/updateproject_order",updateProject_order);
router.delete("/deleteproject_order/:id",deleteProject_order);
// router.get("/getProject_order_name",getProject_order_name);
module.exports=router;