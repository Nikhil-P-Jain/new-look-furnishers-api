const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createUnit:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        unit_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        unit_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        unit_status=1;
        pool.query(
            'insert into unit(unit_name,unit_status,unit_created_date,unit_updated_date) values(?,?,?,?)',
            [data.unit_name,
            unit_status,
            unit_created_date,
            unit_updated_date],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getUnit:callBack=>{
        pool.query(
            `select * from unit`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.unit_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.unit_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.unit_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.unit_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getUnitbyid:(id,callBack)=>{
        pool.query(
            `select unit_name,unit_status,unit_created_date,unit_updated_date from unit where unit_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateUnit:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        unit_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update unit set unit_name=?,unit_status=?,unit_updated_date=? where unit_id=?`,
            [
                body.unit_name,
                body.unit_status,
                unit_updated_date,
                body.unit_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteUnit:(id,callBack)=>{
        pool.query(
            `delete from unit where unit_id=?`,
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
