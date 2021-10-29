const{createSupplier,getSupplier,getSupplierbyid,updateSupplier,deleteSupplier}=require("./supplier.controller");
const router=require("express").Router();
router.post("/createsupplier",createSupplier);
router.get("/getsupplier",getSupplier);
router.get("/getsupplierbyid/:id",getSupplierbyid);
router.patch("/updatesupplier",updateSupplier);
router.delete("/deletesupplier/:id",deleteSupplier);
// router.get("/getsupplier_name",getSupplier_name);
module.exports=router;