const{createProductSpecification,getProductSpecification,getProductSpecificationbyid,updateProductSpecification,deleteProductSpecification,getProductSpecificationbyproductid}=require("./product_specification.controller");
const router=require("express").Router();
router.post("/createproductspecification",createProductSpecification);
router.get("/getproductspecification",getProductSpecification);
router.get("/getproductspecificationbyid/:id",getProductSpecificationbyid);
router.patch("/updateproductspecification",updateProductSpecification);
router.delete("/deleteproductspecification/:id",deleteProductSpecification);
router.get("/getproductspecificationbyproductid/:id",getProductSpecificationbyproductid);
module.exports=router;