const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProject_order:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_order_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_order_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_order_status=1;
        pool.query(
            'insert into project_order (project_quotation_id,project_order_date,project_order_description,site_id,project_order_status,project_order_created_date,project_order_updated_date) values(?,?,?,?,?,?,?)',
            [
                data.project_quotation_id,
                data.project_order_date,
                data.project_order_description,
                data.site_id,
                project_order_status,
                project_order_created_date,
                project_order_updated_date],

            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProject_order:callBack=>{
        pool.query(
            `select p.project_order_id,p.project_quotation_id,pq.quotation_number,p.project_order_date,p.project_order_description,p.site_id,s.site_name,p.project_order_status,p.project_order_created_date,p.project_order_updated_date from project_order p join site s on p.site_id=s.site_id join project_quotation pq on p.project_quotation_id=pq.project_quotation_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.project_order_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_order_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pod=new Date(element.project_order_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_order_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_order_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.project_order_date=DATE_FORMATTER(pod,"yyyy-mm-dd");
                });
                return callBack(null,results);
            })
    },
    getProject_orderbyid:(id,callBack)=>{
        pool.query(
            `select * from project_order where project_order_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pod=new Date(element.project_order_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_order_date=DATE_FORMATTER(pod,"yyyy-mm-dd");
                })
                return callBack(null,results);
            }
        )
    },
    updateProject_order:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_order_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'update project_order set project_quotation_id=?,project_order_date=?,project_order_description=?,site_id=?,project_order_status=?,project_order_updated_date=? where project_order_id=?',

            [
                body.project_quotation_id,
                body.project_order_date,
                body.project_order_description,
                body.site_id,
                body.project_order_status,
                project_order_updated_date,
                body.project_order_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteProject_order:(id,callBack)=>{
        pool.query(
            `delete from project_order where project_order_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )        
    },
}
