const{createAnnexure_details,getAnnexure_details,getAnnexure_detailsbyid,updateAnnexure_details,deleteAnnexure_details,getAnnexure_detailsby_annexure_id}=require("./annexure_details.controller");
const router=require("express").Router();
router.post("/createannexure_details",createAnnexure_details);
router.get("/getannexure_details",getAnnexure_details);
router.get("/getannexure_detailsbyid/:id",getAnnexure_detailsbyid);
router.patch("/updateannexure_details",updateAnnexure_details);
router.delete("/deleteannexure_details/:id",deleteAnnexure_details);
router.get("/getannexure_detailsby_annexure_id/:id",getAnnexure_detailsby_annexure_id);
module.exports=router;