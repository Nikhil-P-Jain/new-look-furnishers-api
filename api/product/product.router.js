const{createProduct,getProduct,getProductbyid,updateProduct,deleteProduct,getsubproductbyproductid,get_product_by_category_id}=require("./product.controller");
const router=require("express").Router();
router.post("/createproduct",createProduct);
router.get("/getproduct",getProduct);
router.get("/getproductbyid/:id",getProductbyid);
router.get("/get_product_by_category_id/:id",get_product_by_category_id);

router.patch("/updateproduct",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);
router.get("/getsubproductbyproductid/:id",getsubproductbyproductid);
module.exports=router;