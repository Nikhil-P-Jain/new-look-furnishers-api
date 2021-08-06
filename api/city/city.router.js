const{createCity,getCity,getCitybyid,updateCity,deleteCity}=require("./city.controller");
const router=require("express").Router();
router.post("/createcity",createCity);
router.get("/getcity",getCity);
router.get("/getcitybyid/:id",getCitybyid);
router.patch("/updatecity",updateCity);
router.delete("/deletecity/:id",deleteCity);
module.exports=router;