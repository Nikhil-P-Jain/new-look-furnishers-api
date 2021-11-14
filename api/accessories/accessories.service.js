const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    create_accessories:(data,callback)=>{
        // console.log("accessories data",data);
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        var anid=data.annexure_id;
        // console.log(anid,"annexuere_id");
        data.acinfo.forEach(element => {
            // console.log(element,"element");
            pool.query(
                `INSERT INTO accessories(annexure_id,accessories_name,accessories_quantity,accessories_length,accessories_total_length,accessories_module,accessories_area,created_date,updated_date) values(?,?,?,?,?,?,?,?,?)`,
                [
                    anid,
                    element.accessories_name,
                    element.accessories_quantity,
                    element.accessories_length,
                    element.accessories_total_length,
                    element.accessories_module,
                    element.accessories_area,
                    created_date,
                    updated_date
                ],
                (error,results,fields)=>{
                    // console.log(error,"error");
                    // console.log(results,"results");
                    if(error){
                        return callback(error);
                    }

                    if(0 == --data.acinfo.length){
                        return callback(null,results);
                    }
                }
            )
        });
    },


    get_accessories:(id,callback)=>{
        pool.query(
            `select * from accessories where annexure_id=?`,
            [id],
            (error,results)=>{
                if(error){
                    return callback(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callback(null,results);
            }
        )
    },
    get_accessoriesbyid:(id,callback)=>{
        // console.log(id,"ids");
        var resultRow=[];
        pool.query(
            `select * from accessories where annexure_id=?`,
            [id],
            (error,results,fields)=>{
                // console.log("error",error);
                // console.log(results,"resul;ts");
                if(error){
                    return callback(error);
                } 
                    return callback(null,results);
                                
            }
        )
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
                                acinfo:respp
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
    update_accessories:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        created_date=DATE_FORMATTER(body.created_date,"yyyy-mm-dd hh:MM:ss");
        // pool.query(
        //     `update accessories set accessories_name=?,accessories_quantity=?,accessories_length=?,accessories_total_length=?,accessories_module=?,updated_date=? where annexure_id=?`,
        //     [
        //         data.accessories_name,
        //         data.accessories_quantity,
        //         data.accessories_length,
        //         data.accessories_total_length,
        //         data.accessories_module,
        //         updated_date,
        //         data.annexure_id,
        //     ]
        // )
        pool.query(
            `delete from accessories where annexure_id=?`,
            [
             body.annexure_id   
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    // console.log(results,"resss");
                    // console.log(body,"body");
                    body.acinfo.forEach(element => {
                    // console.log(element,"element");
                    pool.query(
                        `INSERT INTO accessories(annexure_id,accessories_name,accessories_length,accessories_quantity,accessories_total_length,accessories_module,accessories_area,created_date,updated_date) VALUES (?,?,?,?,?,?,?,?,?)`,
                        [
                        body.annexure_id,
                        element.accessories_name,
                        element.accessories_length,
                        element.accessories_quantity,
                        element.accessories_total_length,
                        element.accessories_module,
                        element.accessories_area,
                        created_date,
                        updated_date
                        ],
                        (error,results,fields)=>{
                            // console.log(error,"errorhere");
                            // console.log(results,"resultshere");
                            if(error){
                                return callBack(error);
                            }
                            if(0 == --body.acinfo.length){
                                return callBack(null,results);
                            }
                        }
                    )
                });
                }
                else{
                    return callBack(null,results);
                }
            })
    },
    delete_accessories:(id,callBack)=>{
        pool.query(
            `delete from accessories where accessories_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
}