const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createProject_lead:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_lead_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_lead_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        // order_status='Under Discussion'
        pool.query(
            'INSERT INTO project_lead (project_lead_name,architect_name,department_name,project_value,user_id,product_id,project_lead_remarks,project_current_status,order_status,project_lead_date,status,project_lead_created_date,project_lead_updated_date) values (?,?,?,?,?,?,?,?,?,?,1,?,?)',
            [
                data.project_lead_name,
                data.architect_name,
                data.department_name,
                data.project_value,
                data.user_id,
                data.product_id,
                data.project_lead_remarks,
                data.project_current_status,
                data.order_status,
                data.project_lead_date,
                project_lead_created_date,
                project_lead_updated_date
            ],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getProject_lead:callBack=>{
        var resultRow=[];
        pool.query(
            `SELECT pl.project_lead_id,pl.project_lead_name,pl.architect_name,pl.department_name,pl.project_value,concat(u.first_name,' ',u.last_name) as user_name,pl.product_id,p.product_name,pl.project_lead_remarks,pl.project_current_status,pl.order_status,pl.project_lead_date,pl.status,pl.project_lead_created_date,pl.project_lead_updated_date FROM project_lead pl join user u on pl.user_id=u.user_id join product p on pl.product_id=p.product_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    const prod= element.product_id;
                    element.product_id=prod.split(',');
                    var namee=[],pid=[];
                    // console.log(element.product_id);
                    let cd=new Date(element.project_lead_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_lead_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pld=new Date(element.project_lead_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_lead_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_date=DATE_FORMATTER(pld,"yyyy-mm-dd");
                    element.product_id.forEach(element12 => {
                        pool.query(
                            `select product_id,product_name from product where product_id=?`,
                            [
                             element12   
                            ],
                            (error,resu,fields)=>{
                                if(error){
                                    return callBack(error)
                                }
                                pid.push(element12)
                                namee.push(resu[0].product_name);
                                if(0 == --element.product_id.length){
                                    element.product_name=namee;
                                    element.product_id=pid;
                                    // console.log(element);
                                    resultRow.push(element)
                                    if(0 == --results.length){
                                        return callBack(null,resultRow);
                                    }
                                }
                            }
                        )
                    });
                });
                // return callBack(null,results);
            })
    },
    getprojectnameforquotation:callBack=>{
        pool.query(
            `select project_lead_id,project_lead_name,project_current_status from project_lead where order_status='Quotation Submitted' OR order_status='Under Discussion'`,
            [],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getProject_leadbyid:(id,callBack)=>{
        pool.query(
            `SELECT project_lead_id,project_lead_name,architect_name,department_name,project_value,user_id,product_id,project_lead_remarks,project_current_status,project_lead_date,status,order_status,project_lead_created_date,project_lead_updated_date FROM project_lead where project_lead_id=?`,
            //`SELECT pl.project_lead_name,pl.architect_name,pl.department_name,pl.project_value,concat(u.first_name,' ',u.last_name) as user_name,pl,p.product_name,pl.project_lead_remarks,pl.project_current_status,pl.order_status,pl.project_lead_date,pl.status,pl.project_lead_created_date,pl.project_lead_updated_date FROM project_lead pl join user u on pl.user_id=u.user_id join product p on pl.product_id=p.product_id where project_lead_id=?`,

            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pld=new Date(element.project_lead_date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_lead_date=DATE_FORMATTER(pld,"yyyy-mm-dd");
                    const prod= element.product_id;
                    element.product_id=prod.split(',');
                    // console.log(element.product_id);
                })
                return callBack(null,results);
            }
        )
    },
    getpldetailsbyid:(id,callBack)=>{
        var resultRow=[];
        pool.query(
            `SELECT pl.project_lead_name,pl.architect_name,pl.department_name,pl.project_value,concat(u.first_name,' ',u.last_name) as user_name,pl.product_id,p.product_name,pl.project_lead_remarks,pl.project_current_status,pl.order_status,pl.project_lead_date,pl.status,pl.project_lead_created_date,pl.project_lead_updated_date FROM project_lead pl join user u on pl.user_id=u.user_id join product p on pl.product_id=p.product_id where project_lead_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    const prod= element.product_id;
                    element.product_id=prod.split(',');
                    var namee=[],pid=[];
                    // console.log(element.product_id);
                    let cd=new Date(element.project_lead_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.project_lead_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let pld=new Date(element.project_lead_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.project_lead_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                    element.project_lead_date=DATE_FORMATTER(pld,"yyyy-mm-dd");
                    element.product_id.forEach(element12 => {
                        pool.query(
                            `select product_id,product_name from product where product_id=?`,
                            [
                             element12   
                            ],
                            (error,resu,fields)=>{
                                if(error){
                                    return callBack(error)
                                }
                                pid.push(element12)
                                namee.push(resu[0].product_name);
                                if(0 == --element.product_id.length){
                                    element.product_name=namee;
                                    element.product_id=pid;
                                    console.log(element);
                                    resultRow.push(element)
                                    if(0 == --results.length){
                                        return callBack(null,resultRow);
                                    }
                                }
                            }
                        )
                    });
                });
                // return callBack(null,results);
            })
    },
    updateProject_lead:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_lead_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update project_lead set project_lead_name=?,architect_name=?,department_name=?,project_value=?,user_id=?,product_id=?,project_lead_remarks=?,project_current_status=?,order_status=?,project_lead_date=?,status=?,project_lead_updated_date=? where project_lead_id=?`,
            [
                body.project_lead_name,
                body.architect_name,
                body.department_name,
                body.project_value,
                body.user_id,
                body.product_id,
                body.project_lead_remarks,
                body.project_current_status,
                body.order_status,
                body.project_lead_date,
                body.status,
                project_lead_updated_date,
                body.project_lead_id
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
    deleteProject_lead:(id,callBack)=>{
        pool.query(
            `delete from project_lead where project_lead_id=?`,
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
