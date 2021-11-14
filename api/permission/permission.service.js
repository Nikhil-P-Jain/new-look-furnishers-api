const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createPermission:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
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
                results.forEach(element => {
                    const act_na= element.activities_id;
                    element.activities_id =act_na.split(','); 
                });
                return callBack(null,results);
            }
        );
    },
    updatePermission:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        permission_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
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
        var resultRow=[];
        pool.query(
        'select P.permission_id,R.Role_Name,A.activities_name,P.activities_id,P.permission_view,P.permission_create,P.permission_update,P.permission_delete,P.permission_created_date,P.permission_updated_date from Role R JOIN permission P ON (R.Role_Id=P.role_id) JOIN activities A ON (A.activities_id=P.activities_id)',
        [],
        (error,results,fields)=>{
            if(error){
                console.log(error);
                return callBack(error);
            }
            // console.log(results);

            results.forEach(element => {
                const act_na= element.activities_id;
                element.activities_id =act_na.split(',');
                console.log("Id",element.activities_id);
                var namee=[];
                let cd=new Date(element.permission_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                let ud=new Date(element.permission_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                element.permission_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                element.permission_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                element.activities_id.forEach(element12 => {
                    pool.query(
                        `select activities_id,activities_name from activities where activities_id=?`,
                        [
                         element12   
                        ],
                        (error,resu,fields)=>{
                            if(error){
                                return callBack(error)
                            }
                            namee.push(resu[0].activities_name);
                            if(0 == --element.activities_id.length){
                                element.activities_name=namee;
                                resultRow.push(element)
                                if(0 == --results.length){
                                    return callBack(null,resultRow);
                                }
                            }
                        }
                    )
                });
            });
            
        }
        )
    },
//     getRoleNamebyid:(id,callBack)=>{
//         var resultRow=[];
//         pool.query(
//         'select P.permission_id,R.Role_Name,A.activities_name,P.activities_id,P.permission_view,P.permission_create,P.permission_update,P.permission_delete,P.permission_created_date,P.permission_updated_date from Role R JOIN permission P ON (R.Role_Id=P.role_id) JOIN activities A ON (A.activities_id=P.activities_id) where permission_id=?',
//         [id],
//         (error,results,fields)=>{
//             if(error){
//                 console.log(error);
//                 return callBack(error);
//             }
//             console.log(results);

//             results.forEach(element => {
//                 const act_na= element.activities_id;
//                 element.activities_id =act_na.split(',');
//                 console.log("Id",element.activities_id);
//                 var namee=[];
//                 element.activities_id.forEach(element12 => {
//                     pool.query(
//                         `select activities_id,activities_name from activities where activities_id=?`,
//                         [
//                          element12   
//                         ],
//                         (error,resu,fields)=>{
//                             if(error){
//                                 return callBack(error)
//                             }
//                             namee.push(resu[0].activities_name);
//                             if(0 == --element.activities_id.length){
//                                 element.activities_name=namee;
//                                 resultRow.push(element)
//                                 if(0 == --results.length){
//                                     return callBack(null,resultRow);
//                                 }
//                             }
//                         }
//                     )
//                 });
//             });
            
//         }
//         )
//     },

        

}