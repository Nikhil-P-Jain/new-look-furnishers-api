const{createSite,getSite,getSitebyid,updateSite,deleteSite}=require("./Site.controller");
const router=require("express").Router();
router.post("/createsite",createSite);
router.get("/getsite",getSite);
router.get("/getsitebyid/:id",getSitebyid);
router.patch("/updatesite",updateSite);
router.delete("/deletesite/:id",deleteSite);
module.exports=router;