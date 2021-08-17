const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProject_quotation:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_quotation_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'INSERT INTO project_quotation (project_lead_id,client_name,main_contractor,user_id,quotation_number,quotation_amount,product_id,remarks,date,status,project_quotation_created_date,project_quotation_updated_date) values (?,?,?,?,?,?,?,?,?,1,?,?)',
            [
                data.project_lead_id,
                data.client_name,
                data.main_contractor,
                data.user_id,
                data.quotation_number,
                data.quotation_amount,
                data.product_id,
                data.remarks,
                data.date,    
                project_quotation_created_date,
                project_quotation_updated_date
            ],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProject_quotation:callBack=>{
        pool.query(
            `SELECT pq.project_quotation_id,pl.project_lead_id,pl.project_lead_name,pq.client_name,main_contractor,concat(u.first_name,' ',u.last_name) as user_name,pq.quotation_number,pq.quotation_amount,p.product_id,p.product_name,pq.remarks,pq.date,pq.status,pq.project_quotation_created_date,pq.project_quotation_updated_date FROM project_quotation pq join user u on pq.user_id=u.user_id join project_lead pl on pq.project_lead_id=pl.project_lead_id join product p on pq.product_id=p.product_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.project_quotation_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_quotation_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pqd=new Date(element.date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_quotation_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_quotation_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.date=DATE_FORMATTER(pqd,"yyyy-mm-dd");
                });
                return callBack(null,results);
            }
        )
    },
    getProject_quotationbyid:(id,callBack)=>{
        pool.query(
            // `SELECT project_lead_id,client_name,main_contractor,user_id,quotation_number,quotation_amount,product_id,remarks,date,status,project_quotation_created_date,project_quotation_updated_date FROM project_quotation where project_quotation_id=?`,
            `SELECT pq.project_quotation_id,pl.project_lead_id,pl.project_lead_name,pq.client_name,main_contractor,concat(u.first_name,' ',u.last_name) as user_name,pq.quotation_number,pq.quotation_amount,p.product_id,p.product_name,pq.remarks,pq.date,pq.status,pq.project_quotation_created_date,pq.project_quotation_updated_date FROM project_quotation pq join user u on pq.user_id=u.user_id join project_lead pl on pq.project_lead_id=pl.project_lead_id join product p on pq.product_id=p.product_id where project_quotation_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pqd=new Date(element.date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.date=DATE_FORMATTER(pqd,"yyyy-mm-dd");
                })
                return callBack(null,results);
            }
        )
    },
    updateProject_quotation:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update project_quotation set project_lead_id=?,client_name=?,main_contractor=?,user_id=?,quotation_number=?,quotation_amount=?,product_id=?,remarks=?,date=?,status=?,project_quotation_updated_date=? where project_quotation_id=?`,
            [
                body.project_lead_id,
                body.client_name,
                body.main_contractor,
                body.user_id,
                body.quotation_number,
                body.quotation_amount,
                body.product_id,
                body.remarks,
                body.date,
                body.status,
                project_quotation_updated_date,
                body.project_quotation_id
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
    deleteProject_quotation:(id,callBack)=>{
        pool.query(
            `delete from project_quotation where project_quotation_id=?`,
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
