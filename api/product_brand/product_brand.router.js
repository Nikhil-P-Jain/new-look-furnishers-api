const{createProduct_brand,getProduct_brand,getProduct_brandbyid,updateProduct_brand,deleteProduct_brand}=require("./product_brand.controller");
const router=require("express").Router();
router.post("/createproduct_brand",createProduct_brand);
router.get("/getproduct_brand",getProduct_brand);
router.get("/getproduct_brandbyid/:id",getProduct_brandbyid);
router.patch("/updateproduct_brand",updateProduct_brand);
router.delete("/deleteproduct_brand/:id",deleteProduct_brand);
module.exports=router;