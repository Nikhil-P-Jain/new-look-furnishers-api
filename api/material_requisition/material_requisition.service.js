const pool = require("../../config/db");
const DATE_FORMATTER = require("dateformat");
var async = require("async");

module.exports = {
  createMaterialRequisition: (data, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    created_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    updated_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    pool.query(
      `insert into material_requisition(site_id,date,store_location,user_id,annexure_id,challan_no,created_at,updated_at,status) values(?,?,?,?,?,?,?,?,1)`,
      [
        data.site_id,
        data.date,
        data.store_location,
        data.user_id,
        data.annexure_id,
        data.challan_no,
        created_at,
        updated_at,
      ],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          var id = results.insertId;

          data.info.forEach((element) => {
            pool.query(
              `insert into material_requisition_order(material_requisition_id,material_requisition_items_id,unit_id,stock_at_site,order_quantity) values(?,?,?,?,?)`,
              [
                id,
                element.material_requisition_items_id,
                element.unit_id,
                element.stock_at_site,
                element.order_quantity,
              ],
              (error, results, fields) => {
                if (error) {
                  console.log(error);
                  return callBack(error);
                }

                if (0 == --data.info.length) {
                  return callBack(null, id);
                }
              }
            );
          });
        }
        // return callBack(null,results);
      }
    );
  },
  getMaterialRequisition: (callBack) => {
    var resultRow = [];
    pool.query(
      `select mr.material_requisition_id,mr.site_id,s.site_name,mr.date,s.site_address,mr.store_location,mr.challan_no,mr.user_id,u.first_name,u.last_name,mr.annexure_id,mr.status,mr.created_at,mr.updated_at from material_requisition mr join site s on mr.site_id=s.site_id join user u on mr.user_id=u.user_id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length != 0) {
          results.forEach((element) => {
            let cd = new Date(element.created_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let ud = new Date(element.updated_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let date = new Date(element.date).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            element.created_at = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
            element.updated_at = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
            element.date = DATE_FORMATTER(date, "yyyy-mm-dd");
          });
          var length = results.length;
          async.each(results, (row, callback) => {
            pool.query(
              `SELECT mro.material_requisition_order_id,mro. material_requisition_id, mro.material_requisition_items_id, mri.material_requisition_items_name, mro.unit_id, u.unit_name, mro.stock_at_site, mro.order_quantity FROM material_requisition_order mro join unit u on mro.unit_id=u.unit_id join material_requisition_items mri on mro.material_requisition_items_id=mri.material_requisition_items_id WHERE material_requisition_id=?`,
              [row.material_requisition_id],
              (error, respp, fields) => {
                if (error) {
                  return callBack(error);
                }
                resultRow.push({
                  material_requisition_id: row.material_requisition_id,
                  site_id: row.site_id,
                  site_name: row.site_name,
                  site_address: row.site_addresss,
                  date: row.date,
                  unit_id: row.unit_id,
                  unit_name: row.unit_name,
                  annexure_id: row.annexure_id,
                  user_id: row.user_id,
                  user_name: row.first_name + " " + row.last_name,
                  branch_address: row.branch_address,
                  store_location: row.store_location,
                  challan_no: row.challan_no,
                  status: row.status,
                  created_at: row.created_at,
                  updated_at: row.updated_at,
                  info: respp,
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
  getMaterialRequisitionByAnnexureId: (id, callBack) => {
    var resultRow = [];
    pool.query(
      `select mr.material_requisition_id,mr.site_id,s.site_name,mr.date,s.site_address,mr.store_location,mr.challan_no,mr.user_id,u.first_name,u.last_name,mr.annexure_id,mr.status,mr.created_at,mr.updated_at from material_requisition mr join site s on mr.site_id=s.site_id join user u on mr.user_id=u.user_id where mr.annexure_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length != 0) {
          results.forEach((element) => {
            let cd = new Date(element.created_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let ud = new Date(element.updated_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let date = new Date(element.date).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            element.created_at = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
            element.updated_at = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
            element.date = DATE_FORMATTER(date, "yyyy-mm-dd");
          });
          var length = results.length;
          async.each(results, (row, callback) => {
            pool.query(
              `SELECT mro.material_requisition_order_id,mro. material_requisition_id, mro.material_requisition_items_id, mri.material_requisition_items_name, mro.unit_id, u.unit_name, mro.stock_at_site, mro.order_quantity FROM material_requisition_order mro join unit u on mro.unit_id=u.unit_id join material_requisition_items mri on mro.material_requisition_items_id=mri.material_requisition_items_id WHERE material_requisition_id=?`,
              [row.material_requisition_id],
              (error, respp, fields) => {
                if (error) {
                  return callBack(error);
                }
                resultRow.push({
                  material_requisition_id: row.material_requisition_id,
                  site_id: row.site_id,
                  site_name: row.site_name,
                  site_address: row.site_addresss,
                  date: row.date,
                  unit_id: row.unit_id,
                  unit_name: row.unit_name,
                  annexure_id: row.annexure_id,
                  user_id: row.user_id,
                  user_name: row.first_name + " " + row.last_name,
                  branch_address: row.branch_address,
                  store_location: row.store_location,
                  challan_no: row.challan_no,
                  status: row.status,
                  created_at: row.created_at,
                  updated_at: row.updated_at,
                  info: respp,
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
  getMaterialRequisitionById: (id, callBack) => {
    var resultRow = [];
    pool.query(
      `select mr.material_requisition_id,mr.site_id,s.site_name,mr.user_id,u.first_name,u.last_name,mr.annexure_id,mr.date,s.site_address,mr.store_location,mr.challan_no,mr.status,mr.created_at,mr.updated_at from material_requisition mr join site s on mr.site_id=s.site_id join user u on mr.user_id=u.user_id where mr.material_requisition_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.length != 0) {
          results.forEach((element) => {
            let cd = new Date(element.created_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let ud = new Date(element.updated_at).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            let date = new Date(element.date).toLocaleString("en-US", {
              timeZone: "Asia/Calcutta",
            });
            element.created_at = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
            element.updated_at = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
            element.date = DATE_FORMATTER(date, "yyyy-mm-dd");
          });
          var length = results.length;
          async.each(results, (row, callback) => {
            pool.query(
              `SELECT mro.material_requisition_order_id,mro. material_requisition_id, mro.material_requisition_items_id, mri.material_requisition_items_name, mro.unit_id, u.unit_name, mro.stock_at_site, mro.order_quantity FROM material_requisition_order mro join unit u on mro.unit_id=u.unit_id join material_requisition_items mri on mro.material_requisition_items_id=mri.material_requisition_items_id WHERE material_requisition_id=?`,
              [row.material_requisition_id],
              (error, respp, fields) => {
                if (error) {
                  return callBack(error);
                }
                resultRow.push({
                  material_requisition_id: row.material_requisition_id,
                  site_id: row.site_id,
                  site_name: row.site_name,
                  site_address: row.site_addresss,
                  date: row.date,
                  user_id: row.user_id,
                  annexure_id: row.annexure_id,
                  unit_id: row.unit_id,
                  unit_name: row.unit_name,
                  branch_address: row.branch_address,
                  store_location: row.store_location,
                  challan_no: row.challan_no,
                  status: row.status,
                  created_at: row.created_at,
                  updated_at: row.updated_at,
                  info: respp,
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
  updateMaterialRequisition: (body, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    updated_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    pool.query(
      "update material_requisition set site_id=?,date=?,user=?,store_location=?,challan_no=?,status=?,updated_at=? where material_requisition_id=?",
      [
        body.site_id,
        body.date,
        body.user,
        body.store_location,
        body.challan_no,
        body.status,
        updated_at,
        body.material_requisition_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          var product = results.affectedRows;
          pool.query(
            `delete from material_requisition_order where material_requisition_id=?`,
            [body.material_requisition_id],
            (error, results, fields) => {
              if (error) {
                return callBack(error);
              }
              if (results.affectedRows != 0) {
                body.info.forEach((element) => {
                  pool.query(
                    `INSERT INTO material_requisition_order(material_requisition_id, material_requisition_items_id, unit_id, stock_at_site, order_quantity) VALUES (?,?,?,?,?)
`,
                    [
                      body.material_requisition_id,
                      element.material_requisition_items_id,
                      element.unit_id,
                      element.stock_at_site,
                      element.order_quantity,
                    ],
                    (error, results, fields) => {
                      if (error) {
                        console.log(error, "ee");
                        return callBack(error);
                      }

                      if (0 == --body.info.length) {
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

  deleteMaterialRequisition: (id, callBack) => {
    pool.query(
      `delete from material_requisition where material_requisition_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows != 0) {
          pool.query(
            `delete from material_requisition_order where material_requisition_id=?`,
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
};
