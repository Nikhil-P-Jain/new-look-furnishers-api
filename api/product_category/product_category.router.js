const{createProduct_category,getProduct_category,getProduct_categorybyid,updateProduct_category,deleteProduct_category}=require("./product_category.controller");
const router=require("express").Router();
router.post("/createproduct_category",createProduct_category);
router.get("/getproduct_category",getProduct_category);
router.get("/getproduct_categorybyid/:id",getProduct_categorybyid);
router.patch("/updateproduct_category",updateProduct_category);
router.delete("/deleteproduct_category/:id",deleteProduct_category);
module.exports=router;