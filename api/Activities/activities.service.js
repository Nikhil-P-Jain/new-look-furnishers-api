const pool=require("../../config/db");
const DATE_FORMATTER=require('dateformat')
module.exports={
    createActivities:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        activities_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        activities_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        activities_status=1;
        pool.query(
            `insert into activities (activities_name,activities_status,activities_created_date,activities_updated_date) values(?,?,?,?)`,
            [
                data.activities_name,
                activities_status,
                activities_created_date,
                activities_updated_date
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
    getActivities:callBack=>{
        pool.query(
            `select * from activities`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.activities_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.activities_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.activities_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.activities_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            }
        );
    },
    getActivitiesbyid:(id,callBack)=>{
        pool.query(
            `select activities_name,activities_status,activities_created_date,activities_updated_date from activities where activities_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateActivities:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        activities_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update activities set activities_name=?,activities_status=?,activities_updated_date=? where activities_id=?`,
            [
                body.activities_name,
                body.activities_status,
                activities_updated_date,
                body.activities_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deleteActivities:(id,callBack)=>{
        pool.query(
            `delete from activities where activities_id=?`,
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