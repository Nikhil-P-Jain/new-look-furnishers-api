const{createProduct,getProduct,getProductbyid,updateProduct,deleteProduct,getsubproductbyproductid}=require("./product.controller");
const router=require("express").Router();
router.post("/createproduct",createProduct);
router.get("/getproduct",getProduct);
router.get("/getproductbyid/:id",getProductbyid);
router.patch("/updateproduct",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);
router.get("/getsubproductbyproductid/:id",getsubproductbyproductid);
module.exports=router;