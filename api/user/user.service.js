const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createUser:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        status=1;
        pool.query(
            'insert into user(first_name,middle_name,last_name,address1,address2,phone,email,username,password,photo,role_id,site_id,status,created_date,updated_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                data.first_name,
                data.middle_name,
                data.last_name,
                data.address1,
                data.address2,
                data.phone,
                data.email,
                data.username,
                data.password,
                data.photo,
                data.role_id,
                data.site_id,
                status,
                created_date,
                updated_date],

            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getUser:callBack=>{
        pool.query(
            `select u.user_id,u.first_name,u.middle_name,u.last_name,u.address1,u.address2,u.phone,u.email,u.username,u.password,u.photo,r.role_name,s.site_name,u.status,u.created_date,u.updated_date from user u join Role r on u.role_id=r.Role_Id join site s on u.site_id=s.site_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getUserbyid:(id,callBack)=>{
        pool.query(
            `select first_name,middle_name,last_name,concat(first_name,' ',last_name) as user_name,address1,address2,phone,email,username,password,photo,role_id,site_id,status,created_date,updated_date, from user where user_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateUser:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'update user set first_name=?,middle_name=?,last_name=?,address1=?,address2=?,phone=?,email=?,username=?,password=?,photo=?,role_id=?,site_id=?,status=?,updated_date=? where user_id=?',

            [
                body.first_name,
                body.middle_name,
                body.last_name,
                body.address1,
                body.address2,
                body.phone,
                body.email,
                body.username,
                body.password,
                body.photo,
                body.role_id,
                body.site_id,
                body.status,
                updated_date,
                body.user_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteUser:(id,callBack)=>{
        pool.query(
            `delete from user where user_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )        
    },
    getuser_name:(callBack)=>{
        pool.query(
            `SELECT user_id,concat(first_name,' ',last_name) as user_name FROM user`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
}
