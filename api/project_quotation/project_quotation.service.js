const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
var async = require('async');

module.exports={
    createProject_quotation:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        project_quotation_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'INSERT INTO project_quotation (project_lead_id,client_name,main_contractor,user_id,quotation_number,quotation_amount,branch_id,term_id,remarks,date,status,project_quotation_created_date,project_quotation_updated_date) values (?,?,?,?,?,?,?,?,1,?,?)',
            [
                data.project_lead_id,
                data.client_name,
                data.main_contractor,
                data.user_id,
                data.quotation_number,
                data.quotation_amount,
                data.branch_id,
                data.term_id,
                data.remarks,
                data.date,    
                project_quotation_created_date,
                project_quotation_updated_date
            ],
            (error,results,data1)=>{
                // console.log(error,"err")
                // console.log(results,data1);
                if(error){
                    return callBack(error);
                }
                if(results.affectedRows != 0){
                    var projid=results.insertId;
                    if(data.project_lead_id==0){
                        data.productinfo.forEach(element => {
                            pool.query(
                                `INSERT INTO project_quotation_specified_product(project_quotation_id, product_id, pq_specified_products_quantity, unit_id) VALUES (?,?,?,?)
                                `,
                                [
                                 projid,
                                 element.product_id,
                                 element.pq_specified_products_quantity,
                                 element.unit_id,
                                ],
                                (error,results,fields)=>{
                                    console.log(error);
                                    if(error){
                                        return callBack(error);
                                    }
    
                                    if(0 == --data.productinfo.length){
                                        return callBack(null,projid);
                                    }
                                }
                            )
                        });
                    }
                    else{
                        var projid=results.insertId;
                        console.log('data',data);
                        pool.query(
                        `update project_lead set order_status='Quotation Submitted' where project_lead_id=?`,
                        [data.project_lead_id],
                        (error,results,fields)=>{
                            // console.log(error);
                            if(error){
                                return callBack(error);
                            }
                            if(results.affectedRows != 0){
                                // console.log(projid,"projid",data.productinfo);
                                data.productinfo.forEach(element => {
                                    pool.query(
                                        `INSERT INTO project_quotation_specified_product(project_quotation_id, product_id, pq_specified_products_quantity, unit_id) VALUES (?,?,?,?)
                                        `,
                                        [
                                         projid,
                                         element.product_id,
                                         element.pq_specified_products_quantity,
                                         element.unit_id,
                                        ],
                                        (error,results,fields)=>{
                                            console.log(error);
                                            if(error){
                                                return callBack(error);
                                            }
            
                                            if(0 == --data.productinfo.length){
                                                return callBack(null,projid);
                                            }
                                        }
                                    )
                                });
                            }
                            //return callBack(null,results);
                        }
                    )
                    }
                }

            })
    },


    getProject_quotation:callBack=>{   
        var resultRow=[];         
        pool.query(
            `SELECT pq.project_quotation_id,pq.project_lead_id,pl.project_lead_name,pq.client_name,pq.main_contractor,pq.user_id,concat(u.first_name,' ',u.last_name) as user_name,pq.quotation_number,pq.quotation_amount,pq.branch_id,b.branch_name,pq.term_id,t.term_name,t.term,pq.remarks,pq.date,pq.status,pq.project_quotation_created_date,pq.project_quotation_updated_date FROM project_quotation pq join user u on pq.user_id=u.user_id left join project_lead pl on pq.project_lead_id=pl.project_lead_id join branch b on pq.branch_id=b.branch_id join terms t on pq.term_id=t.term_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    // console.log(error);
                    return callBack(error);
                }
                results.forEach(element => {
                    const prod= element.product_id;
                    var namee=[],pid=[];
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
        var resultRow=[];
        pool.query(
            `SELECT project_quotation_id,project_lead_id,client_name,main_contractor,user_id,quotation_number,quotation_amount,term_id,branch_id,remarks,date,status,project_quotation_created_date,project_quotation_updated_date FROM project_quotation where project_quotation_id=?`,
            // `select * from project_quotation where project_quotation_id=?`
            // `SELECT pq.project_quotation_id,pl.project_lead_id,pl.project_lead_name,pq.client_name,main_contractor,concat(u.first_name,' ',u.last_name) as user_name,pq.quotation_number,pq.quotation_amount,p.product_id,p.product_name,pq.remarks,pq.date,pq.status,pq.project_quotation_created_date,pq.project_quotation_updated_date FROM project_quotation pq join user u on pq.user_id=u.user_id join project_lead pl on pq.project_lead_id=pl.project_lead_id join product p on pq.product_id=p.product_id where project_quotation_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element=>{
                    let pqd=new Date(element.date).toLocaleDateString('en-US',{timeZone:'Asia/Calcutta'});
                    element.date=DATE_FORMATTER(pqd,"yyyy-mm-dd");
                })
                if(results.length != 0){
                    results.forEach(element => {
                        let cd=new Date(element.project_order_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                        let ud=new Date(element.project_order_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                        let pod=new Date(element.project_order_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                        element.project_order_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                        element.project_order_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                        element.project_order_date=DATE_FORMATTER(pod,"yyyy-mm-dd");
                    });
                    var length=results.length;
                    async.each(results,(row,callback)=>{
                        pool.query(
                            `SELECT pop.pq_specified_products_id, pop.project_quotation_id, pop.product_id, pc.product_category_id, pc.product_category_name, pb.product_brand_id, pb.product_brand_name, p.product_name,p.product_specification, pop.pq_specified_products_quantity, pop.unit_id, u.unit_name FROM project_quotation_specified_product pop join product p on pop.product_id=p.product_id join unit u on pop.unit_id=u.unit_id join product_category pc on p.product_category_id=pc.product_category_id join product_brand pb on pc.product_brand_id=pb.product_brand_id where pop.project_quotation_id=?`,
                            [   
                                row.project_quotation_id    
                            ],
                            (error,respp,fields)=>{
                                if(error){
                                    return callBack(error);
                                }
                                resultRow.push({
                                    project_quotation_id:row.project_quotation_id,
                                    project_lead_id:row.project_lead_id,
                                    client_name:row.client_name,
                                    main_contractor:row.main_contractor,
                                    user_id:row.user_id,
                                    quotation_number:row.quotation_number,
                                    quotation_amount:row.quotation_amount,
                                    branch_id:row.branch_id,
                                    term_id:row.term_id,
                                    remarks:row.remarks,
                                    date:row.date,
                                    status:row.status,
                                    project_quotation_created_date:row.project_quotation_created_date,
                                    project_quotation_updated_date:row.project_quotation_updated_date,
                                    productinfo:respp
                                })
                                if(0 == --length){
                                    return callBack(null,resultRow);
                                }
                            }
                        )
                    })
                    }else{   
                    return callBack(null,results);
                    }
                //return callBack(null,results);
            }
        )
    },
    getpqdetailsbyid:(id,callBack)=>{
        var resultRow=[];         
        pool.query(
            `SELECT pq.project_quotation_id,pq.project_lead_id,pl.project_lead_name,pq.client_name,pq.main_contractor,pq.user_id,concat(u.first_name,' ',u.last_name) as user_name,pq.quotation_number,pq.quotation_amount,pq.branch_id,b.branch_name,b.branch_address,b.gst_no,b.header,b.footer,pq.term_id,t.term_name,t.term,pq.remarks,pq.date,pq.status,pq.project_quotation_created_date,pq.project_quotation_updated_date FROM project_quotation pq join user u on pq.user_id=u.user_id left join project_lead pl on pq.project_lead_id=pl.project_lead_id join branch b on pq.branch_id=b.branch_id join terms t on pq.term_id=t.term_id where project_quotation_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    // console.log(error);
                    return callBack(error);
                }
                results.forEach(element => {
                    var namee=[],pid=[];
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
    updateProject_quotation:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        project_quotation_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update project_quotation set project_lead_id=?,client_name=?,main_contractor=?,user_id=?,quotation_number=?,quotation_amount=?,branch_id=?,term_id=?,,remarks=?,date=?,status=?,project_quotation_updated_date=? where project_quotation_id=?`,
            [
                body.project_lead_id,
                body.client_name,
                body.main_contractor,
                body.user_id,
                body.quotation_number,
                body.quotation_amount,
                body.branch_id,
                body.term_id,
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
                if(results.affectedRows != 0){
                    var product=results.affectedRows;
                    pool.query(
                        `delete from project_quotation_specified_product where project_quotation_id=?`,
                        [
                         body.project_quotation_id   
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                    if(results.affectedRows != 0){
                    body.productinfo.forEach(element => {
                        pool.query(
                            `INSERT INTO project_quotation_specified_product(project_quotation_id, product_id, pq_specified_products_quantity, unit_id) VALUES (?,?,?,?)`,
                            [
                             body.project_quotation_id,
                             element.product_id,
                             element.pq_specified_products_quantity,
                             element.unit_id,
                            ],
                            (error,results,fields)=>{
                                if(error){
                                    return callBack(error);
                                }
                                if(0 == --body.productinfo.length){
                                    return callBack(null,product);
                                }
                            }
                        )
                    });
                }else{
                return callBack(null,results);
                }
            }
        )
        }else{
            return callBack(null,results)
        }
                //return callBack(null,results);
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
                if(results.affectedRows != 0){
                    var ll=results.affectedRows
                    pool.query(
                        `delete from project_quotation_specified_product where project_quotation_id=?`,
                        [
                         id   
                        ],
                        (error,results,fields)=>{
                            if(error){
                                return callBack(error);
                            }
                            return callBack(null,ll);
                        }
                    )
                }else{
                return callBack(null,results);
                }
                //return callBack(null,results);
            }
        )        
    }
}