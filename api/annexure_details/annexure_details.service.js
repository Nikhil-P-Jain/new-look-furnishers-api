const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createAnnexure_details:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `insert into annexure_details (annexure_id,product_id,length,quantity,total_length,module,area,total_area,created_date,updated_date,status) values(?,?,?,?,?,?,?,?,?,?,1)`,
            [
                data.annexure_id,
                data.product_id,
                data.length,
                data.quantity,
                data.total_length,
                data.module,
                data.area,
                data.total_area,
                created_date,
                updated_date
            ],
            (error,results,data)=>{
                // console.log(error);
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
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
            `select annexure_id,product_id,length,quantity,total_length,module,area,total_area,created_date,updated_date,status from annexure_details where annexure_details_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateAnnexure_details:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update annexure_details set annexure_id=?,product_id=?,length=?,quantity=?,total_length=?,module=?,area=?,total_area=?,updated_date=?,status=? where annexure_details_id=?`,
            [
                body.annexure_id,
                body.product_id,
                body.length,
                body.quantity,
                body.total_length,
                body.module,
                body.area,
                body.total_area,
                updated_date,
                body.status,
                body.annexure_details_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
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
            `select annexure_details_id,product_id,length,quantity,total_length,module,area,total_area,created_date,updated_date,status from annexure_details where annexure_id=?`,
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