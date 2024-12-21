const express = require("express");
const router = express.Router();
const RadniNalogController = require("../controllers/radniNalogController");

router.post("/", RadniNalogController.create);
router.get("/", RadniNalogController.getAll);
router.get("/:brojrn", RadniNalogController.getById);
router.put("/:brojrn", RadniNalogController.update);
router.delete("/:brojrn", RadniNalogController.delete);

module.exports = router;
