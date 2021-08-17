const{createProductSpecification,getProductSpecification,getProductSpecificationbyid,updateProductSpecification,deleteProductSpecification}=require("./product_specification.controller");
const router=require("express").Router();
router.post("/createproductspecification",createProductSpecification);
router.get("/getproductspecification",getProductSpecification);
router.get("/getproductspecificationbyid/:id",getProductSpecificationbyid);
router.patch("/updateproductspecification",updateProductSpecification);
router.delete("/deleteproductspecification/:id",deleteProductSpecification);
module.exports=router;