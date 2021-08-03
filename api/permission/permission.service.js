const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createPermission:(data,callBack)=>{
        var cur=new Date().toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
        permission_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        permission_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `insert into permission (role_id,activities_id,permission_view,permission_create,permission_update,permission_delete,permission_created_date,permission_updated_date) values(?,?,?,?,?,?,?,?)`,
            [
                data.role_id,
                data.activities_id,
                data.permission_view,
                data.permission_create,
                data.permission_update,
                data.permission_delete,
                permission_created_date,
                permission_updated_date
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
    getPermission:callBack=>{
        pool.query(
            `select * from permission`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getPermissionbyid:(id,callBack)=>{
        pool.query(
            `select role_id,activities_id,permission_view,permission_create,permission_update,permission_delete,permission_created_date,permission_updated_date from permission where permission_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updatePermission:(body,callBack)=>{
        var cur=new Date().toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
        permission_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd");
        pool.query(
            `update permission set role_id=?,activities_id=?,permission_view=?,permission_create=?,permission_update=?,permission_delete=?,permission_updated_date=? where permission_id=?`,
            [
                body.role_id,
                body.activities_id,
                body.permission_view,
                body.permission_create,
                body.permission_update,
                body.permission_delete,
                permission_updated_date,
                body.permission_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deletePermission:(id,callBack)=>{
        pool.query(
            `delete from permission where permission_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getRoleName:callBack=>{
        pool.query(
        'select R.Role_Name,A.activities_name,P.permission_view,P.permission_create,P.permission_update,P.permission_delete,P.permission_created_date,P.permission_updated_date from Role R JOIN permission P ON (R.Role_Id=P.role_id) JOIN activities A ON (A.activities_id=P.activities_id)',
        [],
        (error,results,fields)=>{
            if(error){
                console.log(error);
                return callBack(error);
            }
            return callBack(null,results);
        }
        )
    },

}