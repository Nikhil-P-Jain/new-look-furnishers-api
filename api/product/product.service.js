const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProduct:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'insert into product(product_name,category_id,product_status,product_created_date,product_updated_date) values(?,?,1,?,?)',
            [data.product_name,
            data.category_id,
            product_created_date,
            product_updated_date],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProduct:callBack=>{
        pool.query(
            `select p.product_id,p.product_name,pc.product_category_id,pc.product_category_name,p.product_status,p.product_created_date,p.product_updated_date from product p join product_category pc on p.category_id=pc.product_category_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.product_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.product_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.product_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.product_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getProductbyid:(id,callBack)=>{
        pool.query(
            `select product_name,category_id,product_status,product_created_date,product_updated_date from product where product_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateProduct:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update product set product_name=?,category_id=?,product_status=?,product_updated_date=? where product_id=?`,
            [
                body.product_name,
                body.category_id,
                body.product_status,
                product_updated_date,
                body.product_id
            ],
            (error,results,data)=>{
                // console.log(error,results);
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteProduct:(id,callBack)=>{
        pool.query(
            `delete from product where product_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )        
    }

}
