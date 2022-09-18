const {
  createMaterialRequisition,
  getMaterialRequisition,
  getMaterialRequisitionById,
  updateMaterialRequisition,
  deleteMaterialRequisition,
  getMaterialRequisitionByAnnexureId,
} = require("./material_requisition.service");
module.exports = {
  createMaterialRequisition: (req, res) => {
    const body = req.body;
    createMaterialRequisition(body, (err, results) => {
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
            " Material Requisition Created Successfully.",
        });
      }
    });
  },
  getMaterialRequisitionById: (req, res) => {
    let id = req.params.id;
    getMaterialRequisitionById(id, (err, results) => {
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
  getMaterialRequisitionByAnnexureId: (req, res) => {
    let id = req.params.id;
    getMaterialRequisitionByAnnexureId(id, (err, results) => {
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
  getMaterialRequisition: (req, res) => {
    getMaterialRequisition((err, results) => {
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
  updateMaterialRequisition: (req, res) => {
    const body = req.body;
    updateMaterialRequisition(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err,
        });
      }
      if (results != 0) {
        return res.status(200).json({
          success: 1,
          message:
            results.affectedRows +
            " " +
            "MaterialRequisition Updated Successfully!",
        });
      }
      return res.status(404).json({
        success: 1,
        message: "Something went wrong! Please try again!",
      });
    });
  },
  deleteMaterialRequisition: (req, res) => {
    let id = req.params.id;
    deleteMaterialRequisition(id, (err, results) => {
      if (results.affectedRows != 0) {
        return res.status(200).json({
          success: 1,
          message:
            results.affectedRows +
            " " +
            "MaterialRequisition Deleted Successfully!",
        });
      }

      return res.status(404).json({
        success: 1,
        message: "Something went wrong! Please try again!",
      });
    });
  },
};
