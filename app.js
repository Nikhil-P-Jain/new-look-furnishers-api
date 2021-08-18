require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
const publicDir = require('path').join(__dirname,'./api/upload');
app.use("/api/upload",express.static(publicDir));
app.use(cors());
app.use(express.json());
const fileRouter = require("./api/fileUpload/fileUpload.service");
const userRouter=require("./api/user/user.router");
const registrationRouter=require("./api/registration/registration.router")
const roleRouter=require("./api/Role/role.router");
const activitiesRouter=require("./api/Activities/activities.router");
const permissionRouter=require("./api/permission/permission.router");
const stateRouter=require("./api/state/state.router");
const cityRouter=require("./api/city/city.router");
const unitRouter=require("./api/unit/unit.router");
const product_categoryRouter=require("./api/product_category/product_category.router");
const product_brandRouter=require("./api/product_brand/product_brand.router");
const siteRouter=require("./api/site/site.router");
const productRouter=require("./api/product/product.router");
const productspecificationRouter=require("./api/product_specification/product_specification.router");
const projectleadRouter=require("./api/project_lead/project_lead.router");
const projectlostRouter=require("./api/project_lost/project_lost.router");
const projectleadupdatesRouter=require("./api/project_lead_updates/project_lead_updates.router");
const projectlostupdatesRouter=require("./api/project_lost_updates/project_lost_updates.router");
const project_quotationRouter=require("./api/project_quotation/project_quotation.router");
const projectquotationupdatesRouter=require("./api/project_quotation_updates/project_quotation_updates.router");
const supplierRouter=require("./api/supplier/supplier.router");
const ProjectOrderRouter=require("./api/project_order/project_order.router");
app.use("/api/upload" , fileRouter);
app.use("/api/registration",registrationRouter);
app.use("/api/role",roleRouter);
app.use("/api/activities",activitiesRouter);
app.use("/api/permission",permissionRouter);
app.use("/api/state",stateRouter);
app.use("/api/city",cityRouter);
app.use("/api/unit",unitRouter);
app.use("/api/product_brand",product_brandRouter);
app.use("/api/product_category",product_categoryRouter);
app.use("/api/site",siteRouter);
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/product_specification",productspecificationRouter);
app.use("/api/project_lead",projectleadRouter);
app.use("/api/project_lost",projectlostRouter);
app.use("/api/project_lead_updates",projectleadupdatesRouter);
app.use("/api/project_lost_updates",projectlostupdatesRouter);
app.use("/api/project_quotation",project_quotationRouter);
app.use("/api/project_quotation_updates",projectquotationupdatesRouter);
app.use("/api/supplier",supplierRouter);
app.use("/api/project_order",ProjectOrderRouter);
// app.get("/api",(req,res)=>{
//     res.json({
//         success:1,
//         message:"This API is working"
//     });
// });


app.listen(process.env.APP_PORT,()=>{
    console.log('Port Demo:'+process.env.APP_PORT);
})
