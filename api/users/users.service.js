const pool=require("../../config/db");
module.exports={
    create:(data,callBack)=>{
        pool.query(
            `insert into registration(firstName,lastName,emailId,password,contactNumber) values(?,?,?,?,?)`,
            [
                data.fname,
                data.lname,
                data.email,
                data.password,
                data.contactno
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUsers:callBack=>{
        pool.query(
            `select id,firstName,lastName,emailId,contactNumber from registration`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUsersbyid:(id,callBack)=>{
        pool.query(
            `select firstName,lastName,emailId,contactNumber from registration where id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUsers:(data,callBack)=>{
        pool.query(
            `update registration set firstName=?,lastName=?,emailId=?,password=?,contactNumber=? where id=?`,
            [
                data.fname,
                data.lname,
                data.email,
                data.password,
                data.contactno,
                data.id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    deleteUsers:(data,callBack)=>{
        pool.query(
            `delete from registration where id=?`,
            [data.id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    getUsersbyEmail:(email,callBack)=>{
        pool.query(
            `select * from registration where emailId=?`,
        [email],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0])
        });
    },
}