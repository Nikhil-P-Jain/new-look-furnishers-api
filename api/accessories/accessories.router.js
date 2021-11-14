const{create_accessories,get_accessories,get_accessoriesbyid,update_accessories,delete_accessories}=require("./accessories.controller");
const router=require("express").Router();
router.post("/createaccessories",create_accessories);
router.get("/getaccessories/:id",get_accessories);
router.get("/getaccessoriesbyid/:id",get_accessoriesbyid);
router.patch("/updateaccessories",update_accessories);
router.delete("/deleteaccessories/:id",delete_accessories)
module.exports=router;