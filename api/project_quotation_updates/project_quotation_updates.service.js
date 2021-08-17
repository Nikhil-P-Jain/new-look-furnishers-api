const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProject_quotation_updates:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_updates_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_quotation_updates_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `INSERT INTO project_quotation_updates (project_quotation_updates_remarks,project_quotation_id,project_quotation_updates_date,project_quotation_updates_created_date,project_quotation_updates_updated_date) values (?,?,?,?,?)`,
            [
                data.project_quotation_updates_remarks,
                data.project_quotation_id,
                data.project_quotation_updates_date,
                project_quotation_updates_created_date,
                project_quotation_updates_updated_date,
            ],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProject_quotation_updates:(id,callBack)=>{
        pool.query(
            // `SELECT plu.project_quotation_updates_id, plu.project_quotation_id, pl.project_quotation_name, plu.project_quotation_updates_remarks, plu.project_quotation_updates_date, plu.project_quotation_updates_created_date, plu.project_quotation_updates_updated_date FROM project_quotation_updates plu join project_quotation pl on plu.project_quotation_id=pl.project_quotation_id where plu.project_quotation_id=?`,
            `SELECT project_quotation_updates_id,project_quotation_id,project_quotation_updates_remarks,project_quotation_updates_date,project_quotation_updates_created_date,project_quotation_updates_updated_date FROM project_quotation_updates where project_quotation_id=?`,

            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.project_quotation_updates_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_quotation_updates_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let plud=new Date(element.project_quotation_updates_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_quotation_updates_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_quotation_updates_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.project_quotation_updates_date=DATE_FORMATTER(plud,"yyyy-mm-dd");
                });
                return callBack(null,results);
            })
    },
    getProject_quotation_updatesbyid:(id,callBack)=>{
        pool.query(
            `SELECT project_quotation_id,project_quotation_updates_remarks,project_quotation_updates_date,project_quotation_updates_created_date,project_quotation_updates_updated_date FROM project_quotation_updates where project_quotation_updates_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pld=new Date(element.project_quotation_updates_date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_quotation_updates_date=DATE_FORMATTER(pld,"yyyy-mm-dd");
                })
                return callBack(null,results);
            }
        )
    },
    updateProject_quotation_updates:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_updates_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update project_quotation_updates set project_quotation_id=?,project_quotation_updates_remarks=?,project_quotation_updates_date=?,project_quotation_updates_updated_date=? where project_quotation_updates_id=?`,
            [
                body.project_quotation_id,
                body.project_quotation_updates_remarks,
                body.project_quotation_updates_date,
                project_quotation_updates_updated_date,
                body.project_quotation_updates_id
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
    deleteProject_quotation_updates:(id,callBack)=>{
        pool.query(
            `delete from project_quotation_updates where project_quotation_updates_id=?`,
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
