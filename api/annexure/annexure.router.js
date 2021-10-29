const{createAnnexure,getAnnexure,getAnnexurebyid,updateAnnexure,deleteAnnexure,getAnnexureby_poid}=require("./annexure.controller");
const router=require("express").Router();
router.post("/createannexure",createAnnexure);
router.get("/getannexure",getAnnexure);
router.get("/getannexurebyid/:id",getAnnexurebyid);
router.patch("/updateannexure",updateAnnexure);
router.delete("/deleteannexure/:id",deleteAnnexure);
router.get("/getannexureby_poid/:id",getAnnexureby_poid);
module.exports=router;