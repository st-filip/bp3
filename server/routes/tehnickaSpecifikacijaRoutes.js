const express = require("express");
const router = express.Router();
const TehnickaSpecifikacijaController = require("../controllers/tehnickaSpecifikacijaController");

router.get("/", TehnickaSpecifikacijaController.getAll);

module.exports = router;
