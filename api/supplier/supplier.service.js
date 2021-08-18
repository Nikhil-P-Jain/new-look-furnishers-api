const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createSupplier:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        supplier_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        supplier_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        supplier_status=1;
        pool.query(
            'insert into supplier(supplier_name,supplier_company,supplier_address,city_id,supplier_contact_no,supplier_email_id,supplier_status,supplier_created_date,supplier_updated_date) values(?,?,?,?,?,?,?,?,?)',
            [
                data.supplier_name,
                data.supplier_company,
                data.supplier_address,
                data.city_id,
                data.supplier_contact_no,
                data.supplier_email_id,
                supplier_status,
                supplier_created_date,
                supplier_updated_date],

            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getSupplier:callBack=>{
        pool.query(
            `select s.supplier_id,s.supplier_name,s.supplier_company,s.supplier_address,s.city_id,c.city_name,s.supplier_contact_no,s.supplier_email_id,s.supplier_status,s.supplier_created_date,s.supplier_updated_date from supplier s join city c on s.city_id=c.city_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.supplier_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.supplier_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.supplier_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.supplier_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getSupplierbyid:(id,callBack)=>{
        pool.query(
            `select * from supplier where supplier_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateSupplier:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        supplier_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'update supplier set supplier_name=?,supplier_company=?,supplier_address=?,city_id=?,supplier_contact_no=?,supplier_email_id=?,supplier_status=?,supplier_updated_date=? where supplier_id=?',

            [
                body.supplier_name,
                body.supplier_company,
                body.supplier_address,
                body.city_id,
                body.supplier_contact_no,
                body.supplier_email_id,
                body.supplier_status,
                supplier_updated_date,
                body.supplier_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteSupplier:(id,callBack)=>{
        pool.query(
            `delete from supplier where supplier_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )        
    },
    // getSupplier_name:(callBack)=>{
    //     pool.query(
    //         `SELECT user_id,concat(first_name,' ',last_name) as user_name FROM user`,
    //         [],
    //         (error,results,fields)=>{
    //             if(error){
    //                 return callBack(error);
    //             }
    //             return callBack(null,results);
    //         }
    //     )
    // },
}
