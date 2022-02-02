const { createTerm, updateTerm, getTerms, getTermById, deleteTerm } = require("./terms.controller");

const router = require("express").Router();
router.post("/createterm", createTerm);
router.get("/getterms", getTerms);
router.get("/gettermbyid/:id", getTermById);
router.patch("/updateterm", updateTerm);
router.delete("/deleteterm/:id", deleteTerm);
module.exports = router;