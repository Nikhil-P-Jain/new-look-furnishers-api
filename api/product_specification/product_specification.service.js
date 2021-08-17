const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProductSpecification:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_specification_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        product_specification_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'insert into product_specification(product_specification_name,product_id,product_brand_id,product_specification_status,product_specification_created_date,product_specification_updated_date) values(?,?,?,1,?,?)',
            [
                data.product_specification_name,
                data.product_id,
                data.product_brand_id,
                product_specification_created_date,
                product_specification_updated_date
            ],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProductSpecification:callBack=>{
        pool.query(
            `select ps.product_specification_id,ps.product_specification_name,p.product_name,pb.product_brand_name,ps.product_specification_status,ps.product_specification_created_date,ps.product_specification_updated_date from product_specification ps join product p on ps.product_id=p.product_id join product_brand pb on ps.product_brand_id=pb.product_brand_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.product_specification_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.product_specification_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.product_specification_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.product_specification_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getProductSpecificationbyid:(id,callBack)=>{
        pool.query(
            `select product_specification_name,product_id,product_brand_id,product_specification_status,product_specification_created_date,product_specification_updated_date from product_specification where product_specification_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateProductSpecification:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        product_specification_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update product_specification set product_specification_name=?,product_id=?,product_brand_id=?,product_specification_status=?,product_specification_updated_date=? where product_specification_id=?`,
            [
                body.product_specification_name,
                body.product_id,
                body.product_brand_id,
                body.product_specification_status,
                product_specification_updated_date,
                body.product_specification_id
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
    deleteProductSpecification:(id,callBack)=>{
        pool.query(
            `delete from product_specification where product_specification_id=?`,
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
