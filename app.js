require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const userRouter=require("./api/users/users.router");
const roleRouter=require("./api/Role/role.router");
const activitiesRouter=require("./api/Activities/activities.router");
const permissionRouter=require("./api/permission/permission.router");
const stateRouter=require("./api/state/state.router");
const cityRouter=require("./api/city/city.router");
const unitRouter=require("./api/unit/unit.router");
app.use("/api/users",userRouter);
app.use("/api/role",roleRouter);
app.use("/api/activities",activitiesRouter);
app.use("/api/permission",permissionRouter);
app.use("/api/state",stateRouter);
app.use("/api/city",cityRouter);
app.use("/api/unit",unitRouter);
// app.get("/api",(req,res)=>{
//     res.json({
//         success:1,
//         message:"This API is working"
//     });
// });


app.listen(process.env.APP_PORT,()=>{
    console.log('Port Demo:'+process.env.APP_PORT);
})
