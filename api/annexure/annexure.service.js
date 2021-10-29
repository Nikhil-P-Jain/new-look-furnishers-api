const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createAnnexure:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `insert into annexure (purchase_order_id,created_date,updated_date,status) values(?,?,?,1)`,
            [
                data.purchase_order_id,
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
    getAnnexure:callBack=>{
        pool.query(
            `select * from annexure`,
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
    getAnnexurebyid:(id,callBack)=>{
        pool.query(
            `select purchase_order_id,status,created_date,updated_date from annexure where annexure_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateAnnexure:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update annexure set purchase_order_id=?,status=?,updated_date=? where annexure_id=?`,
            [
                body.purchase_order_id,
                body.status,
                updated_date,
                body.annexure_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deleteAnnexure:(id,callBack)=>{
        pool.query(
            `delete from annexure where annexure_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getAnnexureby_poid:(id,callBack)=>{
        pool.query(
            `select annexure_id,status,created_date,updated_date from annexure a where purchase_order_id=? join purchase_order po on po.purchase_order_id=a.purchase_order_id`,
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