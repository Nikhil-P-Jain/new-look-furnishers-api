const pool = require("../../config/db");
const DATE_FORMATTER = require("dateformat");
module.exports = {
  createMaterialRequisitionItem: (data, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    created_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    updated_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    pool.query(
      "insert into material_requisition_items(material_requisition_items_name,status,created_at,updated_at) values(?,1,?,?)",
      [data.material_requisition_items_name, created_at, updated_at],
      (error, results, data) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMaterialRequisitionItem: (callBack) => {
    pool.query(
      `select * from material_requisition_items`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        results.forEach((element) => {
          let cd = new Date(element.created_at).toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
          });
          let ud = new Date(element.updated_at).toLocaleString("en-US", {
            timeZone: "Asia/Calcutta",
          });
          element.created_at = DATE_FORMATTER(cd, "yyyy-mm-dd hh:MM:ss");
          element.updated_at = DATE_FORMATTER(ud, "yyyy-mm-dd hh:MM:ss");
        });
        return callBack(null, results);
      }
    );
  },
  getMaterialRequisitionItemById: (id, callBack) => {
    pool.query(
      `select material_requisition_items_name,status,created_at,updated_at from material_requisition_items where material_requisition_items_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateMaterialRequisitionItem: (body, callBack) => {
    var cur = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    updated_at = DATE_FORMATTER(cur, "yyyy-mm-dd hh:MM:ss");
    pool.query(
      `update material_requisition_items set material_requisition_items_name=?,status=?,updated_at=? where material_requisition_items_id=?`,
      [
        body.material_requisition_items_name,
        body.status,
        updated_at,
        body.material_requisition_items_id,
      ],
      (error, results, data) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteMaterialRequisitionItem: (id, callBack) => {
    pool.query(
      `delete from material_requisition_items where material_requisition_items_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
