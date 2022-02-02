require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const publicDir = require('path').join(__dirname, './api/upload');
app.use("/api/upload", express.static(publicDir));
app.use(cors());
app.use(express.json());

//////////////
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// const axios = require('axios').default;
// io.on("connection", socket => {
//         console.log("New client connected"), setInterval(
//           () => getApiAndEmit(socket),
//           100000
//         );
//         socket.on("disconnect", () => console.log("Client disconnected"));
//       });
//       const getApiAndEmit = async socket => {
//         try {
//           const res = await axios.get(
//             "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//           );
//             // console.log(res.data,"nihangres");
//           socket.emit("FromAPI", res.data);
//         } catch (error) {
//           console.error(`Error: ${error.code}`);
//         }
//       };
//  http.listen(3000, function(){
//     console.log('listening on *:3000');
//  });
//////////////////////


const fileRouter = require("./api/fileUpload/fileUpload.service");
const userRouter = require("./api/user/user.router");
const registrationRouter = require("./api/registration/registration.router")
const roleRouter = require("./api/Role/role.router");
const activitiesRouter = require("./api/Activities/activities.router");
const permissionRouter = require("./api/permission/permission.router");
const stateRouter = require("./api/state/state.router");
const cityRouter = require("./api/city/city.router");
const branchRouter = require("./api/branch/branch.router");
const termsRouter = require("./api/terms/terms.router");
const unitRouter = require("./api/unit/unit.router");
const product_categoryRouter = require("./api/product_category/product_category.router");
const product_brandRouter = require("./api/product_brand/product_brand.router");
const siteRouter = require("./api/site/site.router");
const productRouter = require("./api/product/product.router");
const productspecificationRouter = require("./api/product_specification/product_specification.router");
const projectleadRouter = require("./api/project_lead/project_lead.router");
const projectlostRouter = require("./api/project_lost/project_lost.router");
const projectleadupdatesRouter = require("./api/project_lead_updates/project_lead_updates.router");
const projectlostupdatesRouter = require("./api/project_lost_updates/project_lost_updates.router");
const project_quotationRouter = require("./api/project_quotation/project_quotation.router");
const projectquotationupdatesRouter = require("./api/project_quotation_updates/project_quotation_updates.router");
const supplierRouter = require("./api/supplier/supplier.router");
const ProjectOrderRouter = require("./api/project_order/project_order.router");
const PurchaseOrderRouter = require("./api/purchase_order/purchase_order.router");
const annexureRouter = require("./api/annexure/annexure.router");
const annexure_detailsRouter = require("./api/annexure_details/annexure_details.router");
const accessoriesRouter = require("./api/accessories/accessories.router");
app.use("/api/upload", fileRouter);
app.use("/api/registration", registrationRouter);
app.use("/api/role", roleRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/permission", permissionRouter);
app.use("/api/state", stateRouter);
app.use("/api/city", cityRouter);
app.use("/api/branch", branchRouter);
app.use("/api/terms", termsRouter);
app.use("/api/unit", unitRouter);
app.use("/api/product_brand", product_brandRouter);
app.use("/api/product_category", product_categoryRouter);
app.use("/api/site", siteRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/product_specification", productspecificationRouter);
app.use("/api/project_lead", projectleadRouter);
app.use("/api/project_lost", projectlostRouter);
app.use("/api/project_lead_updates", projectleadupdatesRouter);
app.use("/api/project_lost_updates", projectlostupdatesRouter);
app.use("/api/project_quotation", project_quotationRouter);
app.use("/api/project_quotation_updates", projectquotationupdatesRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/project_order", ProjectOrderRouter);
app.use("/api/purchase_order", PurchaseOrderRouter);
app.use("/api/annexure", annexureRouter);
app.use("/api/annexure_details", annexure_detailsRouter);
app.use("/api/accessories", accessoriesRouter);

app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This API is working"
    });
});


app.listen(process.env.APP_PORT, () => {
    console.log('Port Demo:' + process.env.APP_PORT);
})
