const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProduct_category:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_category_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_category_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_category_status=1;
        pool.query(
            'insert into product_category(product_category_name,product_brand_id,product_category_status,product_category_created_date,product_category_updated_date) values(?,?,?,?,?)',
            [data.product_category_name,
            data.product_brand_id,
            product_category_status,
            product_category_created_date,
            product_category_updated_date],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProduct_category:callBack=>{
        pool.query(
            `select pc.product_category_id,pc.product_category_name,pc.product_brand_id,pb.product_brand_name,pc.product_category_status,pc.product_category_created_date,pc.product_category_updated_date from product_category pc join product_brand pb on pc.product_brand_id=pb.product_brand_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.product_category_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.product_category_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.product_category_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.product_category_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getProduct_categorybyid:(id,callBack)=>{
        pool.query(
            `select product_category_name,product_brand_id,product_category_status,product_category_created_date,product_category_updated_date from product_category where product_category_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    get_product_category_by_brand_id:(id,callBack)=>{
        pool.query(
            `select pc.product_category_id,pc.product_category_name,pc.product_brand_id,pb.product_brand_name,pc.product_category_status,pc.product_category_created_date,pc.product_category_updated_date from product_category pc join product_brand pb on pc.product_brand_id=pb.product_brand_id where pc.product_brand_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateProduct_category:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_category_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update product_category set product_category_name=?,product_brand_id=?,product_category_status=?,product_category_updated_date=? where product_category_id=?`,
            [
                body.product_category_name,
                body.product_brand_id,
                body.product_category_status,
                product_category_updated_date,
                body.product_category_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteProduct_category:(id,callBack)=>{
        pool.query(
            `delete from product_category where product_category_id=?`,
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
