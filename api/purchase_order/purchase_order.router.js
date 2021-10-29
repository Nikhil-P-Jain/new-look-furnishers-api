const{createpurchase_order,getpurchase_order,getpurchase_orderbyid,updatepurchase_order,deletepurchase_order}=require("./purchase_order.controller");
const router=require("express").Router();
router.post("/createpurchase_order",createpurchase_order);
router.get("/getpurchase_order",getpurchase_order);
router.get("/getpurchase_orderbyid/:id",getpurchase_orderbyid);
router.patch("/updatepurchase_order",updatepurchase_order);
router.delete("/deletepurchase_order/:id",deletepurchase_order);
// router.get("/getpurchase_order_name",getpurchase_order_name);
module.exports=router;