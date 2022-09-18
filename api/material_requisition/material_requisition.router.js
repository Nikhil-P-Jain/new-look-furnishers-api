const {
  createMaterialRequisition,
  getMaterialRequisition,
  updateMaterialRequisition,
  deleteMaterialRequisition,
  getMaterialRequisitionById,
  getMaterialRequisitionByAnnexureId,
} = require("./material_requisition.controller");
const router = require("express").Router();
router.post("", createMaterialRequisition);
router.get("", getMaterialRequisition);
router.get("/:id", getMaterialRequisitionById);
router.get(
  "/get-material-requisition-by-annexure/:id",
  getMaterialRequisitionByAnnexureId
);
router.patch("", updateMaterialRequisition);
router.delete("/:id", deleteMaterialRequisition);
module.exports = router;
