const {
  createMaterialRequisitionItem,
  getMaterialRequisitionItem,
  updateMaterialRequisitionItem,
  deleteMaterialRequisitionItem,
  getMaterialRequisitionItemById,
} = require("./material_requisition_items.controller");
const router = require("express").Router();
router.post("", createMaterialRequisitionItem);
router.get("", getMaterialRequisitionItem);
router.get("/:id", getMaterialRequisitionItemById);
router.patch("", updateMaterialRequisitionItem);
router.delete("/:id", deleteMaterialRequisitionItem);
module.exports = router;
