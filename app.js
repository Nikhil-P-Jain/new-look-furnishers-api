require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const userRouter=require("./api/users/users.router");
const roleRouter=require("./api/Role/role.router");
const activitiesRouter=require("./api/Activities/activities.router");
const permissionRouter=require("./api/permission/permission.router")
app.use("/api/users",userRouter);
app.use("/api/role",roleRouter);
app.use("/api/activities",activitiesRouter);
app.use("/api/permission",permissionRouter);
// app.get("/api",(req,res)=>{
//     res.json({
//         success:1,
//         message:"This API is working"
//     });
// });


app.listen(process.env.APP_PORT,()=>{
    console.log('Port Demo:'+process.env.APP_PORT);
})
