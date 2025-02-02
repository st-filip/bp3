const express = require("express");
const router = express.Router();
const TipProizvodaController = require("../controllers/tipProizvodaController");

router.get("/", TipProizvodaController.getAll);

module.exports = router;
