const pool=require("../../config/db");
var async = require('async');
const DATE_FORMATTER=require('dateformat')
module.exports={
    createAnnexure_details:(data,callBack)=>{
        console.log("Getting request :-", data);
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        var prodinfo=data.prodinfo;
        var acinfo=data.acinfo;
        if(data.prodinfo.length != 0 || data.acinfo.length != 0){
        pool.query(
            `insert into annexure (purchase_order_id,created_date,updated_date,status) values(?,?,?,1)`,
            [
                data.purchase_order_id,
                created_date,
                updated_date
            ],
            (error,results,data)=>{
                console.log(error,"err1");
                if(error){
                    return callBack(error);
                }
                if(results.insertId != 0){
                    var anid=results.insertId;
                    // console.log(data.prodinfo,"data");
                    var len=prodinfo.length;
                    var promiseArray=[];
                    if(len !== 0){
                        prodinfo.forEach(element => {
                            var promiseFun=new Promise((resolve,reject)=>{
                                pool.query(
                                    `insert into annexure_details (annexure_id,product_id,length,quantity,total_length,module,area,created_date,updated_date,status) values(?,?,?,?,?,?,?,?,?,1)`,
                                    [
                                        anid,
                                        element.product_id,
                                        element.length,
                                        element.quantity,
                                        element.total_length,
                                        element.module,
                                        element.area,
                                        created_date,
                                        updated_date
                                    ],
                                    (error,results,data)=>{
                                        console.log(error,"err2");
                                        if(error){
                                            reject(error);
                                        }
                                        resolve(results);
                                    }
                                )
                            })
                            promiseArray.push(promiseFun);
                        });

                        Promise.all(promiseArray).then((values)=>{
                            if(acinfo.length != 0){
                                acinfo.forEach(element => {
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
                                                return callBack(error);
                                            }
                        
                                            if(0 == --acinfo.length){
                                                return callBack(null,anid);
                                            }
                                        }
                                    )
                                });
                            }else{
                                return callBack(null,anid);
                            }
                        })
                    }else{
                        if(acinfo.length != 0){
                            acinfo.forEach(element => {
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
                                            return callBack(error);
                                        }
                    
                                        if(0 == --acinfo.length){
                                            return callBack(null,anid);
                                        }
                                    }
                                )
                            });
                        }else{
                            return callBack(null,anid);
                        }
                    }
                }else{
                    return callBack(null,"Annexure not created!!")
                }
            }
        )
        }else{
            return callBack(null,"Annexure not created!!")
        }
    },
    getAnnexure_details:callBack=>{
        pool.query(
            `select * from annexure_details`,
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
            }
        );
    },
    getAnnexure_detailsbyid:(id,callBack)=>{
        pool.query(
            `select annexure_id,product_id,length,quantity,total_length,module,area,created_date,updated_date,status from annexure_details where annexure_details_id=?`,
            [id],
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
            }
        );
    },
    // updateAnnexure_details:(body,callBack)=>{
    //     var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
    //     updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
    //     pool.query(
    //         `update annexure_details set annexure_id=?,product_id=?,length=?,quantity=?,total_length=?,module=?,area=?,updated_date=?,status=? where annexure_details_id=?`,
    //         [
    //             body.annexure_id,
    //             body.product_id,
    //             body.length,
    //             body.quantity,
    //             body.total_length,
    //             body.module,
    //             body.area,
    //             updated_date,
    //             body.status,
    //             body.annexure_details_id
    //         ],
    //         (error,results,data)=>{
    //             if(error){
    //                 return callBack(error);
    //             }
    //             return callBack(null,results);
    //         }
    //     );
    // },
    // updateAnnexure_details:(body,callBack)=>{
    //     // console.log(body,"body");
    //     var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
    //     updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
    //     pool.query(
    //         `update annexure set updated_date=? where annexure_id=?`,
    //         [
    //             updated_date,
    //             body.annexure_id
    //         ],
    //         (error,results,data)=>{
    //             // console.log(error,"error");
    //             if(error){
    //                 return callBack(error);
    //             }
    //             if(results.affectedRows != 0){
    //                 var product=results.affectedRows;
    //                 pool.query(
    //                     `delete from annexure_details, accessories_details where annexure_id=?`,
    //                     [
    //                      body.annexure_id   
    //                     ],
    //                     (error,results,fields)=>{
    //                         if(error){
    //                             return callBack(error);
    //                         }
    //                 if(results.affectedRows != 0){
                        
    //                     console.log(body,"body");
    //                     body.productinfo.forEach(element => {
    //                     pool.query(
    //                         `INSERT INTO annexure_details(annexure_id,product_id,length,quantity,total_length,module,area,created_date,updated_date,status) VALUES (?,?,?,?,?,?,?,?,?,1)`,
    //                         [
    //                          body.annexure_id,
    //                          element.product_id,
    //                          element.length,
    //                          element.quantity,
    //                          element.total_length,
    //                          element.module,
    //                          element.area,
    //                          created_date,
    //                          updated_date
    //                         ],
    //                         (error,results,fields)=>{
    //                             // console.log(error,"error");
    //                             if(error){
    //                                 return callBack(error);
    //                             }
    //                             if(0 == --body.productinfo.length){
    //                                 return callBack(null,product);
    //                             }
    //                         }
    //                     )
    //                 });
    //             }else{
    //             return callBack(null,results);
    //             }
    //         }
    //     )
    //     }else{
    //         return callBack(null,results)
    //     }
    //             //return callBack(null,results);
    //     }
    //     )
        
    // },
    updateAnnexure_details:(body,callBack)=>{
        // console.log(body,"body");
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update annexure set updated_date=? where annexure_id=?`,
            [
                updated_date,
                body.annexure_id
            ],
            (error,results,data)=>{
                // console.log(error,"error");
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    new Promise((resolve,reject)=>{
                        pool.query(
                            `delete from annexure_details where annexure_id=?`,
                            [
                             body.annexure_id   
                            ],
                            (error,results,fields)=>{
                                if(error){
                                    reject(error);
                                }
                                resolve(results);
                            }).then((values)=>{
                                new Promise((resolve,reject)=>{
                                    pool.query(
                                        `delete from accessories where annexure_id=?`,
                                        [body.annexure_id],
                                        (error,respp,fields)=>{
                                            if(error){
                                                reject(error);
                                                return callBack(error);
                                            }
                                            resolve(respp);
                                            return callBack(null,respp);
                                        }
                                    )
                                })
                            })                        
                    })
                    pool.query(
                        `delete from annexure_details, accessories_details where annexure_id=?`,
                        [
                         body.annexure_id   
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                    if(results.affectedRows != 0){
                        
                        console.log(body,"body");
                        body.productinfo.forEach(element => {
                        pool.query(
                            `INSERT INTO annexure_details(annexure_id,product_id,length,quantity,total_length,module,area,created_date,updated_date,status) VALUES (?,?,?,?,?,?,?,?,?,1)`,
                            [
                             body.annexure_id,
                             element.product_id,
                             element.length,
                             element.quantity,
                             element.total_length,
                             element.module,
                             element.area,
                             created_date,
                             updated_date
                            ],
                            (error,results,fields)=>{
                                // console.log(error,"error");
                                if(error){
                                    return callBack(error);
                                }
                                if(0 == --body.productinfo.length){
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
                //return callBack(null,results);
        }
        )
        
    },
    delete_annexure_and_details:(id,callBack)=>{
        pool.query(
            `delete from annexure where annexure_id=?`,
            [
                id
            ],
            (error,results,data)=>{
                // console.log(error,"error");
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    new Promise((resolve,reject)=>{
                        pool.query(
                            `delete from annexure_details where annexure_id=?`,
                            [
                             id   
                            ],
                            (error,results,fields)=>{
                                if(error){
                                    reject(error);
                                }
                                resolve(results);
                            })
                        }).then((values)=>{
                                    pool.query(
                                        `delete from accessories where annexure_id=?`,
                                        [id],
                                        (error,respp,fields)=>{
                                            console.log(error);

                                            if(error){
                                                return callBack(error);
                                            }
                                            return callBack(null,respp);
                                        }
                                    )
                                })                    
    }
}
)},
    getAnnexure_detailsby_annexure_id:(id,callBack)=>{
        pool.query(
            `select ad.annexure_details_id,p.product_name,ad.product_id,ad.length,quantity,ad.total_length,ad.module,ad.area,ad.created_date,ad.updated_date,ad.status from annexure_details ad join product p on ad.product_id=p.product_id where ad.annexure_id=?`,
            [id],
            (error,results,fields)=>{
                // console.log(error);
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
            }
        );
    },


    // delete_annexure_and_details:(id,callBack)=>{
    //     // console.log(id,"id");
    //     pool.query(
    //         'delete from annexure where annexure_id=?',
    //         [id],
    //         (error,results,data1)=>{
    //             // console.log(error,"err")
    //             if(error){
    //                 return callBack(error);
    //             }
    //             if(results.affectedRows != 0){
    //                 // console.log("in");
    //                 pool.query(
    //                     `delete from annexure_details where annexure_id=?`,
    //                     [id],
    //                     (error,results,fields)=>{
    //                         if(error)
    //                         {
    //                         return callBack(error);
    //                         }
    //                         return callBack(null,results);
    //                     }
    //                 )
    //             }

    //         }
    //     )
    // },
    get_annexure_details_json:(id,callBack)=>{
        var resultRow=[];
        // console.log(id,"id");
        pool.query(
            `SELECT an.annexure_id,an.purchase_order_id,po.po_number,pl.project_lead_name,sup.supplier_name,st.site_name,st.site_address,us.phone,concat(us.first_name," ",us.last_name) as contact_name,an.created_date,an.updated_date,an.status from annexure an join purchase_order po on po.purchase_order_id=an.purchase_order_id join project_order pro on po.project_order_id=pro.project_order_id join project_quotation pq on pro.project_quotation_id=pq.project_quotation_id join project_lead pl on pq.project_lead_id=pq.project_lead_id=pl.project_lead_id join supplier sup on po.supplier_id=sup.supplier_id join site st on po.site_id=st.site_id join user us on st.site_id=us.site_id where annexure_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                // console.log(results,"results");
                if(results.length != 0){
                    results.forEach(element => {
                        let cd=new Date(element.created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                        let ud=new Date(element.updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                        element.created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                        element.updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    });
                    var length=results.length;
                    async.each(results,(row,callback)=>{
                        pool.query(
                            `select ad.annexure_details_id,p.product_name,ad.product_id,ps.product_specification_name,ad.length,quantity,ad.total_length,ad.module,ad.area,ad.created_date,ad.updated_date,ad.status from annexure_details ad join product p on ad.product_id=p.product_id join product_specification ps on p.product_id=ps.product_id where annexure_id=?`,
                            [row.annexure_id],
                            (error,respp,fields)=>{
                                // console.log(respp,"respp");
                                if(error){
                                    return callBack(error);
                                }
                                resultRow.push({
                                    purchase_order_id:row.purchase_order_id,
                                    po_number:row.po_number,
                                    project_lead_name:row.project_lead_name,
                                    supplier_name:row.supplier_name,
                                    site_name:row.site_name,
                                    site_address:row.site_address,
                                    phone:row.phone,
                                    contact_name:row.contact_name,
                                    created_date:row.created_date,
                                    updated_date:row.updated_date,
                                    status:row.status,
                                    product_name:row.product_name,
                                    product_id:row.product_id,
                                    product_specification_name:row.product_specification_name,
                                    length:row.length,
                                    quantity:row.quantity,
                                    total_length:row.total_length,
                                    module:row.module,
                                    area:row.area,
                                    created_date:row.created_date,
                                    updated_date:row.updated_date,
                                    prodinfo:respp
                                })
                                // console.log(resultRow,"rr");
                                if(0 == --length){
                                    return callBack(null,resultRow);
                                }
                            }
                        )
                    })
                    }else{   
                    return callBack(null,results);
                    }
                //return callBack(null,results);
            }
        )
    },

}