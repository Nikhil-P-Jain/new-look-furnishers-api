const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
var async = require('async');
module.exports={
    createpurchase_order:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        purchase_order_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        purchase_order_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'insert into purchase_order (project_order_id,po_number,purchase_order_date,purchase_order_description,site_id,supplier_id,purchase_order_status,purchase_order_created_date,purchase_order_updated_date) values(?,?,?,?,?,?,1,?,?)',
            [
                data.project_order_id,
                data.po_number,
                data.purchase_order_date,
                data.purchase_order_description,
                data.site_id,
                data.supplier_id,
                purchase_order_created_date,
                purchase_order_updated_date],

            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    var purid=results.insertId;
                    console.log(purid,"purid",data);
                    data.productsinfo.forEach(element => {
                        pool.query(
                            `INSERT INTO purchase_order_specified_product(purchase_order_id,specification_id, purchase_order_specified_product_quantity, unit_id) VALUES (?,?,?,?)
                            `,
                            [
                             purid,
                             element.specification_id,
                             element.purchase_order_specified_product_quantity,
                             element.unit_id,
                            ],
                            (error,results,fields)=>{
                                if(error){
                                    return callBack(error);
                                }

                                if(0 == --data.productsinfo.length){
                                    return callBack(null,purid);
                                }
                            }
                        )
                    });
                }
                // return callBack(null,results);
            })
    },
    getpurchase_order:callBack=>{
        var resultRow=[];
        pool.query(
            `select p.purchase_order_id,p.project_order_id,p.po_number,pl.project_lead_name,pl.project_lead_name,po.project_quotation_id,p.purchase_order_date,p.purchase_order_description,p.site_id,s.site_name,p.supplier_id,sup.supplier_name,p.purchase_order_status,p.purchase_order_created_date,p.purchase_order_updated_date from purchase_order p join site s on p.site_id=s.site_id join supplier sup on p.supplier_id=sup.supplier_id join project_order po on p.project_order_id=po.project_order_id join project_quotation pq on po.project_quotation_id=pq.project_quotation_id join project_lead pl on pq.project_lead_id=pl.project_lead_id order by p.purchase_order_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.length != 0){
                results.forEach(element => {
                    let cd=new Date(element.purchase_order_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.purchase_order_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pod=new Date(element.purchase_order_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.purchase_order_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.purchase_order_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.purchase_order_date=DATE_FORMATTER(pod,"yyyy-mm-dd");
                });
                var length=results.length;
                async.each(results,(row,callback)=>{
                    pool.query(
                        `SELECT po.purchase_order_specified_product_id, po.purchase_order_id, po.specification_id,ps.product_specification_name, po.purchase_order_specified_product_quantity, po.unit_id,u.unit_name FROM purchase_order_specified_product po join  product_specification ps on po.specification_id=ps.product_specification_id join unit u on po.unit_id=u.unit_id where po.purchase_order_id=?`,
                        [
                        row.purchase_order_id    
                        ],
                        (error,respp,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                            resultRow.push({
                                purchase_order_id:row.purchase_order_id,
                                project_order_id:row.project_order_id,
                                po_number:row.po_number,
                                project_quotation_id:row.project_quotation_id,
                                project_lead_name:row.project_lead_name,
                                purchase_order_date:row.purchase_order_date,
                                purchase_order_description:row.purchase_order_description,
                                site_id:row.site_id,
                                site_name:row.site_name,
                                supplier_id:row.supplier_id,
                                supplier_name:row.supplier_name,
                                purchase_order_status:row.purchase_order_status,
                                purchase_order_created_date:row.purchase_order_created_date,
                                purchase_order_updated_date:row.purchase_order_updated_date,
                                productinfo:respp
                            })

                            if(0 == --length){
                                return callBack(null,resultRow);
                            }
                        }
                    )
                })
                }else{   
                return callBack(null,results);
                }
            })
    },
    getpurchase_orderbyid:(id,callBack)=>{
        var resultRow=[];
        pool.query(
            `select p.purchase_order_id,p.project_order_id,p.po_number,po.project_quotation_id,pl.project_lead_name,p.purchase_order_date,p.purchase_order_description,p.site_id,s.site_name,concat(u.first_name," ",u.last_name) as contact_name, u.phone,s.site_address,p.supplier_id,sup.supplier_name,p.purchase_order_status,p.purchase_order_created_date,p.purchase_order_updated_date from purchase_order p join site s on p.site_id=s.site_id join user u on s.site_id=u.site_id join supplier sup on p.supplier_id=sup.supplier_id join project_order po on p.project_order_id=po.project_order_id join project_quotation pq on po.project_quotation_id=pq.project_quotation_id join project_lead pl on pq.project_lead_id=pl.project_lead_id where purchase_order_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.length != 0){
                results.forEach(element => {
                    let cd=new Date(element.purchase_order_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.purchase_order_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pod=new Date(element.purchase_order_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.purchase_order_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.purchase_order_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.purchase_order_date=DATE_FORMATTER(pod,"yyyy-mm-dd");
                });
                var length=results.length;
                async.each(results,(row,callback)=>{
                    pool.query(
                        `SELECT po.purchase_order_specified_product_id, po.purchase_order_id, po.specification_id,ps.product_specification_name, po.purchase_order_specified_product_quantity, po.unit_id,u.unit_name,ps.product_id, p.product_name FROM purchase_order_specified_product po join  product_specification ps on po.specification_id=ps.product_specification_id join unit u on po.unit_id=u.unit_id join product p on ps.product_id = p.product_id where po.purchase_order_id=?`,
                        [
                        row.purchase_order_id    
                        ],
                        (error,respp,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                            resultRow.push({
                                purchase_order_id:row.purchase_order_id,
                                project_order_id:row.project_order_id,
                                po_number:row.po_number,
                                project_lead_name:row.project_lead_name,
                                project_quotation_id:row.project_quotation_id,
                                purchase_order_date:row.purchase_order_date,
                                purchase_order_description:row.purchase_order_description,
                                contact_name:row.contact_name,
                                phone:row.phone,
                                site_id:row.site_id,
                                site_name:row.site_name,
                                site_address:row.site_address,
                                supplier_id:row.supplier_id,
                                supplier_name:row.supplier_name,
                                purchase_order_status:row.purchase_order_status,
                                purchase_order_created_date:row.purchase_order_created_date,
                                purchase_order_updated_date:row.purchase_order_updated_date,
                                productinfo:respp
                            })

                            if(0 == --length){
                                return callBack(null,resultRow);
                            }
                        }
                    )
                })
                }else{   
                return callBack(null,results);
                }
            })
    },
    updatepurchase_order:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        purchase_order_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
                    pool.query(
                        'update purchase_order set project_order_id=?,po_number=?,purchase_order_date=?,purchase_order_description=?,site_id=?,supplier_id=?,purchase_order_status=?,purchase_order_updated_date=? where purchase_order_id=?',    
                        [
                            body.project_order_id,
                            body.po_number,
                            body.purchase_order_date,
                            body.purchase_order_description,
                            body.site_id,
                            body.supplier_id,
                            body.purchase_order_status,
                            purchase_order_updated_date,
                            body.purchase_order_id
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                            if(results.affectedRows != 0){
                                var product=results.affectedRows;
                                pool.query(
                                    `delete from purchase_order_specified_product where purchase_order_id=?`,
                                    [
                                     body.purchase_order_id   
                                    ],
                                    (error,results,fields)=>{
                                        if(error){
                                            return callBack(error);
                                        }
                                if(results.affectedRows != 0){
                                body.productsinfo.forEach(element => {
                                    pool.query(
                                        `INSERT INTO purchase_order_specified_product(purchase_order_id, specification_id, purchase_order_specified_product_quantity, unit_id) VALUES (?,?,?,?)
                                        `,
                                        [
                                         body.purchase_order_id,
                                         element.specification_id,
                                         element.purchase_order_specified_product_quantity,
                                         element.unit_id,
                                        ],
                                        (error,results,fields)=>{
                                            if(error){
                                                return callBack(error);
                                            }
            
                                            if(0 == --body.productsinfo.length){
                                                return callBack(null,product);
                                            }
                                        }
                                    )
                                });
                            }else{
                            return callBack(null,results);
                            }
                        }
                    )
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
    deletepurchase_order:(id,callBack)=>{
        pool.query(
            `delete from purchase_order where purchase_order_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    pool.query(
                        `delete from purchase_order_specified_product where purchase_order_id=?`,
                        [
                         id   
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                            return callBack(null,results);
                        }
                    )
                }else{
                return callBack(null,results);
                }
            }
        )        
    },
    getpurchase_orderbyproductid:(id,callBack)=>{
        var fres=[],annexure=[],finalres=[];
        pool.query(
            `SELECT * from purchase_order_specified_product posp join product_specification ps on posp.specification_id=ps.product_specification_id where ps.product_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.length !=0){
                    fres=results;
                    pool.query(
                        `select * from annexure where purchase_order_id=?`,
                        [
                          fres[0].purchase_order_id  
                        ],
                        (error,resul,fields)=>{
                            if(error){
                                return callBack(error)
                            }
                            if(resul.length != 0){
                                var len=resul.length;
                                resul.forEach(element => {
                                    pool.query(
                                        `select * from annexure_details where annexure_id=? and product_id=?`,
                                        [
                                         element.annexure_id,
                                         id  
                                        ],
                                        (error,results,fields)=>{
                                            if(error){
                                                return callBack(error);
                                            }
                                            if(results.length != 0){
                                                results.forEach(element => {
                                                    annexure.push({
                                                        annexure_id:element.annexure_id,
                                                        product_id:element.product_id,
                                                        length:element.length,
                                                        quantity:element.quantity,
                                                        area:element.area
                                                    })       
                                                });
                                            }

                                            if(0 == --len){
                                                finalres.push({
                                                    purchase_order_id:fres[0].purchase_order_id,
                                                    specification_id:fres[0].specification_id,
                                                    purchase_order_specified_product_quantity:fres[0].purchase_order_specified_product_quantity,
                                                    annexure:annexure
                                                })

                                                return callBack(null,finalres);
                                            }
                                        }
                                    ) 
                                });
                            }else{
                                return callBack(null,fres)
                            }
                        }
                    )
                }else{
                    return callBack(null,results);
                }
            }
        )}
}
