const express = require("express");
const router = express.Router();
const ProizvodniPogonController = require("../controllers/proizvodniPogonController");

router.get("/", ProizvodniPogonController.getAll);

module.exports = router;
