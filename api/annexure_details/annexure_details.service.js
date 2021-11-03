const pool=require("../../config/db");
var async = require('async');
const DATE_FORMATTER=require('dateformat')
module.exports={
    createAnnexure_details:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        var prodinfo=data.productinfo;
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
                    console.log(prodinfo,"data");
                    var len=prodinfo.length;
                    prodinfo.forEach(element => {
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
                                    return callBack(error);
                                }
                                if(0 == --len){
                                    return callBack(null,anid + " Annexure Created!!")
                                }
                            }
                        )
                    });
                }else{
                    return callBack(null,"Annexure not created!!")
                }
            }
        )
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
    updateAnnexure_details:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
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
                    var product=results.affectedRows;
                    pool.query(
                        `delete from annexure_details where annexure_id=?`,
                        [
                         body.annexure_id   
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                    if(results.affectedRows != 0){
                        // console.log(body,"body");
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
                                console.log(error,"error");
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
    deleteAnnexure_details:(id,callBack)=>{
        pool.query(
            `delete from annexure_details where annexure_details_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
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


    delete_annexure_and_details:(id,callBack)=>{
        // console.log(id,"id");
        pool.query(
            'delete from annexure where annexure_id=?',
            [id],
            (error,results,data1)=>{
                // console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    // console.log("in");
                    pool.query(
                        `delete from annexure_details where annexure_id=?`,
                        [id],
                        (error,results,fields)=>{
                            if(error)
                            {
                            return callBack(error);
                            }
                            return callBack(null,results);
                        }
                    )
                }

            }
        )
    },
    get_annexure_details_json:(id,callBack)=>{
        var resultRow=[];
        pool.query(
            `SELECT * from annexure where annexure_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
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
                            `select ad.annexure_details_id,p.product_name,ad.product_id,ad.length,quantity,ad.total_length,ad.module,ad.area,ad.created_date,ad.updated_date,ad.status from annexure_details ad join product p on ad.product_id=p.product_id where ad.annexure_id=?`,
                            [   
                                row.annexure_id    
                            ],
                            (error,respp,fields)=>{
                                if(error){
                                    return callBack(error);
                                }
                                resultRow.push({
                                    product_name:row.product_name,
                                    product_id:row.product_id,
                                    length:row.length,
                                    quantity:row.quantity,
                                    total_length:row.total_length,
                                    module:row.module,
                                    area:row.area,
                                    created_date:row.created_date,
                                    updated_date:row.updated_date,
                                    prodinfo:respp
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
                //return callBack(null,results);
            }
        )
    },

}