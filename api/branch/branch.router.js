const { createBranch, updateBranch, getBranch, getBranchById, deleteBranch } = require("./branch.controller");

const router = require("express").Router();
router.post("/createbranch", createBranch);
router.get("/getbranch", getBranch);
router.get("/getbranchbyid/:id", getBranchById);
router.patch("/updatebranch", updateBranch);
router.delete("/deletebranch/:id", deleteBranch);
module.exports = router;