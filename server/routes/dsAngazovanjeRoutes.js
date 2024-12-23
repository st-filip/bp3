const express = require("express");
const router = express.Router();
const DsAngazovanjeController = require("../controllers/dsAngazovanjeController");

router.get("/", DsAngazovanjeController.getAll);
router.post("/", DsAngazovanjeController.create);
router.put("/:brojds/:jmbg/:sifrauloge", DsAngazovanjeController.update);
router.delete("/:brojds/:jmbg/:sifrauloge", DsAngazovanjeController.delete);

module.exports = router;
