const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createRole:(data,callBack)=>{
        var cur=new Date().toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
        Role_Created_Date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        Role_Updated_Date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        Role_Status=1;
        pool.query(
            `insert into Role (Role_Name,Role_Status,Role_Created_Date,Role_Updated_Date) values(?,?,?,?)`,
            [
                data.Role_Name,
                Role_Status,
                Role_Created_Date,
                Role_Updated_Date
            ],
            (error,results,data)=>{
                // console.log(error);
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getRole:callBack=>{
        pool.query(
            `select * from Role`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getRolebyid:(id,callBack)=>{
        pool.query(
            `select Role_Name,Role_Status,Role_Created_Date,Role_Updated_Date from Role where Role_Id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateRole:(body,callBack)=>{
        var cur=new Date().toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
        Updated_Date=DATE_FORMATTER(cur,"yyyy-mm-dd");
        pool.query(
            `update Role set Role_Name=?,Role_Status=?,Role_Updated_Date=? where Role_Id=?`,
            [
                body.Role_Name,
                body.Role_Status,
                Updated_Date,
                body.Role_Id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deleteRole:(id,callBack)=>{
        pool.query(
            `delete from Role where Role_Id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

}