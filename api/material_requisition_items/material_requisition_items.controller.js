const {
  createMaterialRequisitionItem,
  getMaterialRequisitionItem,
  getMaterialRequisitionItemById,
  updateMaterialRequisitionItem,
  deleteMaterialRequisitionItem,
} = require("./material_requisition_items.service");
module.exports = {
  createMaterialRequisitionItem: (req, res) => {
    const body = req.body;
    createMaterialRequisitionItem(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (results.affectedRows != 0) {
        return res.status(200).json({
          success: 1,
          data:
            results.affectedRows +
            " " +
            "Material Requisition Items Created Successfully.",
        });
      }
    });
  },
  getMaterialRequisitionItemById: (req, res) => {
    let id = req.params.id;
    getMaterialRequisitionItemById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          success: 0,
          message: "Record Doesn't Exist!!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: { results },
      });
    });
  },
  getMaterialRequisitionItem: (req, res) => {
    getMaterialRequisitionItem((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (results.length == 0) {
        return res.status(404).json({
          success: 0,
          message: "Record Doesn't Exist!!",
        });
      }
      return res.status(200).json({
        success: 1,
        data: { results },
      });
    });
  },
  updateMaterialRequisitionItem: (req, res) => {
    const body = req.body;
    updateMaterialRequisitionItem(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (results.affectedRows != 0) {
        return res.status(200).json({
          success: 1,
          message:
            results.affectedRows +
            " " +
            "MaterialRequisitionItem Updated Successfully!",
        });
      }
      return res.status(404).json({
        success: 1,
        message: "Something went wrong! Please try again!",
      });
    });
  },
  deleteMaterialRequisitionItem: (req, res) => {
    let id = req.params.id;
    deleteMaterialRequisitionItem(id, (err, results) => {
      if (results.affectedRows != 0) {
        return res.status(200).json({
          success: 1,
          message:
            results.affectedRows +
            " " +
            "MaterialRequisitionItem Deleted Successfully!",
        });
      }

      return res.status(404).json({
        success: 1,
        message: "Something went wrong! Please try again!",
      });
    });
  },
};
