const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createState:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        state_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        state_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        state_status=1;
        pool.query(
            'insert into state(state_name,state_status,state_created_date,state_updated_date) values(?,?,?,?)',
            [data.state_name,
            state_status,
            state_created_date,
            state_updated_date],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getState:callBack=>{
        pool.query(
            `select * from state`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.state_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.state_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.state_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.state_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getStatebyid:(id,callBack)=>{
        pool.query(
            `select state_name,state_status,state_created_date,state_updated_date from state where state_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateState:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        state_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update state set state_name=?,state_status=?,state_updated_date=? where state_id=?`,
            [
                body.state_name,
                body.state_status,
                state_updated_date,
                body.state_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteState:(id,callBack)=>{
        pool.query(
            `delete from state where state_id=?`,
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
