const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProduct_brand:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_brand_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_brand_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_brand_status=1;
        pool.query(
            'insert into product_brand(product_brand_name,product_brand_status,product_brand_created_date,product_brand_updated_date) values(?,?,?,?)',
            [data.product_brand_name,
            product_brand_status,
            product_brand_created_date,
            product_brand_updated_date],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProduct_brand:callBack=>{
        pool.query(
            `select * from product_brand`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.product_brand_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.product_brand_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.product_brand_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.product_brand_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getProduct_brandbyid:(id,callBack)=>{
        pool.query(
            `select product_brand_name,product_brand_status,product_brand_created_date,product_brand_updated_date from product_brand where product_brand_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateProduct_brand:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_brand_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update product_brand set product_brand_name=?,product_brand_status=?,product_brand_updated_date=? where product_brand_id=?`,
            [
                body.product_brand_name,
                body.product_brand_status,
                product_brand_updated_date,
                body.product_brand_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteProduct_brand:(id,callBack)=>{
        pool.query(
            `delete from product_brand where product_brand_id=?`,
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
