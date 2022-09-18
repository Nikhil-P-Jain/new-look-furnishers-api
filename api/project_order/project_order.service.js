const pool = require("../../config/db");
const DATE_FORMATTER = require("dateformat");
var async = require("async");
module.exports = {
  createProject_order: (data, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    project_order_created_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    project_order_updated_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    project_order_status = 1;
    pool.query(
      "insert into project_order (project_quotation_id,project_order_date,project_order_description,site_id,branch_id,term_id,project_order_status,project_order_created_date,project_order_updated_date) values(?,?,?,?,?,?,?)",
      [
        data.project_quotation_id,
        data.project_order_date,
        data.project_order_description,
        data.site_id,
        date.branch_id,
        data.term_id,
        project_order_status,
        project_order_created_date,
        project_order_updated_date,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          var projid = results.insertId;
          console.log(projid, "projid", data);
          data.productsinfo.forEach((element) => {
            pool.query(
              `INSERT INTO project_order_specified_product(project_order_id, product_id, project_order_specified_product_quantity, unit_id, project_order_specified_product_status) VALUES (?,?,?,?,1)
                            `,
              [
                projid,
                element.product_id,
                element.project_order_specified_product_quantity,
                element.unit_id,
              ],
              (error, results, fields) => {
                if (error) {
                  return callBack(error);
                }

                if (0 == --data.productsinfo.length) {
                  return callBack(null, projid);
                }
              }
            );
          });
        }
        // return callBack(null,results);
      }
    );
  },
  getProject_order: (callBack) => {
    var resultRow = [];
    pool.query(
      `select p.project_order_id,p.project_quotation_id,pq.quotation_number,pl.project_lead_name,p.project_order_date,p.project_order_description,p.site_id,s.site_name,p.branch_id,b.branch_name,b.branch_address,p.term_id,t.term_name,t.term,p.project_order_status,p.project_order_created_date,p.project_order_updated_date from project_order p join site s on p.site_id=s.site_id join branch b on p.branch_id=b.branch_id join terms t on p.term_id=t.term_id left join project_quotation pq on p.project_quotation_id=pq.project_quotation_id left join project_lead pl on pq.project_lead_id=pl.project_lead_id order by p.project_order_id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length != 0) {
          results.forEach((element) => {
            let cd = new Date(
              element.project_order_created_date
            ).toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
            let ud = new Date(
              element.project_order_updated_date
            ).toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
            let pod = new Date(element.project_order_date).toLocaleString(
              "en-US",
              { timeZone: "Asia/Calcutta" }
            );
            element.project_order_created_date = DATE_FORMATTER(
              cd,
              "yyyy-mm-dd hh:MM:ss"
            );
            element.project_order_updated_date = DATE_FORMATTER(
              ud,
              "yyyy-mm-dd hh:MM:ss"
            );
            element.project_order_date = DATE_FORMATTER(pod, "yyyy-mm-dd");
          });
          var length = results.length;
          async.each(results, (row, callback) => {
            pool.query(
              `SELECT pop.project_order_specified_product_id, pop.project_order_id, pop.product_id, p.product_specification,pc.product_category_id,pc.product_category_name,pb.product_brand_id,pb.product_brand_name, pop.project_order_specified_product_quantity, pop.unit_id,u.unit_name, pop.project_order_specified_product_status FROM project_order_specified_product pop join product p on pop.product_id=p.product_id join product_category pc on p.product_category_id=pc.product_category_id join product_brand pb on pc.product_brand_id=pb.product_brand_id join unit u on pop.unit_id=u.unit_id where pop.project_order_id=?`,
              [row.project_order_id],
              (error, respp, fields) => {
                if (error) {
                  return callBack(error);
                }
                resultRow.push({
                  project_order_id: row.project_order_id,
                  project_quotation_id: row.project_quotation_id,
                  quotation_number: row.quotation_number,
                  project_lead_name: row.project_lead_name,
                  project_order_date: row.project_order_date,
                  project_order_description: row.project_order_description,
                  site_id: row.site_id,
                  site_name: row.site_name,
                  branch_id: row.branch_id,
                  branch_name: row.branch_name,
                  branch_address: row.branch_address,
                  term_id: row.term_id,
                  term_name: row.term_name,
                  term: row.term,
                  project_order_status: row.project_order_status,
                  project_order_created_date: row.project_order_created_date,
                  project_order_updated_date: row.project_order_updated_date,
                  productinfo: respp,
                });

                if (0 == --length) {
                  return callBack(null, resultRow);
                }
              }
            );
          });
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  getProject_orderbyid: (id, callBack) => {
    var resultRow = [];
    pool.query(
      `select p.project_order_id,p.project_quotation_id,pq.quotation_number,pl.project_lead_name,p.project_order_date,p.project_order_description,p.site_id,s.site_name,p.branch_id,b.branch_name,b.branch_address,p.term_id,t.term_name,t.term,p.project_order_status,p.project_order_created_date,p.project_order_updated_date from project_order p join site s on p.site_id=s.site_id join branch b on p.branch_id=b.branch_id join terms t on p.term_id=t.term_id left join project_quotation pq on p.project_quotation_id=pq.project_quotation_id left join project_lead pl on pq.project_lead_id=pl.project_lead_id where p.project_order_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length != 0) {
          results.forEach((element) => {
            let cd = new Date(
              element.project_order_created_date
            ).toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
            let ud = new Date(
              element.project_order_updated_date
            ).toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
            let pod = new Date(element.project_order_date).toLocaleString(
              "en-US",
              { timeZone: "Asia/Calcutta" }
            );
            element.project_order_created_date = DATE_FORMATTER(
              cd,
              "yyyy-mm-dd hh:MM:ss"
            );
            element.project_order_updated_date = DATE_FORMATTER(
              ud,
              "yyyy-mm-dd hh:MM:ss"
            );
            element.project_order_date = DATE_FORMATTER(pod, "yyyy-mm-dd");
          });
          var length = results.length;
          async.each(results, (row, callback) => {
            pool.query(
              `SELECT pop.project_order_specified_product_id, pop.project_order_id, pop.product_id,p.product_specification,pc.product_category_id,pc.product_category_name,pb.product_brand_id,pb.product_brand_name, pop.project_order_specified_product_quantity, pop.unit_id,u.unit_name, pop.project_order_specified_product_status, p.product_name FROM project_order_specified_product pop join  product p on pop.product_id=p.product_id join product_category pc on p.product_category_id=pc.product_category_id join product_brand pb on pc.product_brand_id=pb.product_brand_id join unit u on pop.unit_id=u.unit_id where pop.project_order_id=?`,
              [row.project_order_id],
              (error, respp, fields) => {
                if (error) {
                  return callBack(error);
                }
                resultRow.push({
                  project_order_id: row.project_order_id,
                  project_quotation_id: row.project_quotation_id,
                  quotation_number: row.quotation_number,
                  project_lead_name: row.project_lead_name,
                  project_order_date: row.project_order_date,
                  project_order_description: row.project_order_description,
                  site_id: row.site_id,
                  site_name: row.site_name,
                  branch_id: row.branch_id,
                  branch_name: row.branch_name,
                  branch_address: row.branch_address,
                  term_id: row.term_id,
                  term_name: row.term_name,
                  term: row.term,
                  project_order_status: row.project_order_status,
                  project_order_created_date: row.project_order_created_date,
                  project_order_updated_date: row.project_order_updated_date,
                  productinfo: respp,
                });

                if (0 == --length) {
                  return callBack(null, resultRow);
                }
              }
            );
          });
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  updateProject_order: (body, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    project_order_updated_date = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    pool.query(
      "update project_order set project_quotation_id=?,project_order_date=?,project_order_description=?,site_id=?,branch_id=?,term_id=?,project_order_status=?,project_order_updated_date=? where project_order_id=?",
      [
        body.project_quotation_id,
        body.project_order_date,
        body.project_order_description,
        body.site_id,
        body.branch_id,
        body.term_id,
        body.project_order_status,
        project_order_updated_date,
        body.project_order_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          var product = results.affectedRows;
          pool.query(
            `delete from project_order_specified_product where project_order_id=?`,
            [body.project_order_id],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              if (results.affectedRows != 0) {
                body.productsinfo.forEach((element) => {
                  pool.query(
                    `INSERT INTO project_order_specified_product(project_order_id, product_id, project_order_specified_product_quantity, unit_id, project_order_specified_product_status) VALUES (?,?,?,?,1)
                                        `,
                    [
                      body.project_order_id,
                      element.product_id,
                      element.project_order_specified_product_quantity,
                      element.unit_id,
                    ],
                    (error, results, fields) => {
                      if (error) {
                        return callBack(error);
                      }

                      if (0 == --body.productsinfo.length) {
                        return callBack(null, product);
                      }
                    }
                  );
                });
              } else {
                return callBack(null, results);
              }
            }
          );
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  deleteProject_order: (id, callBack) => {
    pool.query(
      `delete from project_order where project_order_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          pool.query(
            `delete from project_order_specified_product where project_order_id=?`,
            [id],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              return callBack(null, results);
            }
          );
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  getproject_lead_name: (callBack) => {
    pool.query(
      `SELECT pl.project_lead_name,pq.project_quotation_id,pq.quotation_number from  project_lead pl ,project_quotation pq where pl.project_lead_id=pq.project_lead_id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
