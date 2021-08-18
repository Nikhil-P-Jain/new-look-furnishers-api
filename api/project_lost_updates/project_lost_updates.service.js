const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProject_lost_updates:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_lead_updates_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_lead_updates_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `INSERT INTO project_lead_updates (project_lead_updates_remarks,project_lead_id,project_lead_updates_date,project_lead_updates_created_date,project_lead_updates_updated_date) values (?,?,?,?,?)`,
            [
                data.project_lead_updates_remarks,
                data.project_lead_id,
                data.project_lead_updates_date,
                project_lead_updates_created_date,
                project_lead_updates_updated_date,
            ],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProject_lost_updates:(id,callBack)=>{
        pool.query(
            // `SELECT plu.project_lead_updates_id, plu.project_lead_id, pl.project_lead_name, plu.project_lead_updates_remarks, plu.project_lead_updates_date, plu.project_lead_updates_created_date, plu.project_lead_updates_updated_date FROM project_lead_updates plu join project_lead pl on plu.project_lead_id=pl.project_lead_id where plu.project_lead_id=?`,
            `SELECT project_lead_updates_id,project_lead_id,project_lead_updates_remarks,project_lead_updates_date,project_lead_updates_created_date,project_lead_updates_updated_date FROM project_lead_updates where project_lead_id=?`,

            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.project_lead_updates_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_lead_updates_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let plud=new Date(element.project_lead_updates_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_lead_updates_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_updates_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_updates_date=DATE_FORMATTER(plud,"yyyy-mm-dd");
                });
                return callBack(null,results);
            })
    },
    getProject_lost_updatesbyid:(id,callBack)=>{
        pool.query(
            `SELECT project_lead_id,project_lead_updates_remarks,project_lead_updates_date,project_lead_updates_created_date,project_lead_updates_updated_date FROM project_lead_updates where project_lead_updates_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pld=new Date(element.project_lead_updates_date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_lead_updates_date=DATE_FORMATTER(pld,"yyyy-mm-dd");
                })
                return callBack(null,results);
            }
        )
    },
    updateProject_lost_updates:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_lead_updates_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update project_lead_updates set project_lead_id=?,project_lead_updates_remarks=?,project_lead_updates_date=?,project_lead_updates_updated_date=? where project_lead_updates_id=?`,
            [
                body.project_lead_id,
                body.project_lead_updates_remarks,
                body.project_lead_updates_date,
                project_lead_updates_updated_date,
                body.project_lead_updates_id
            ],
            (error,results,data)=>{
                // console.log(error,results);
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteProject_lost_updates:(id,callBack)=>{
        pool.query(
            `delete from project_lead_updates where project_lead_updates_id=?`,
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
