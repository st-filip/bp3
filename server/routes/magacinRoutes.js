const express = require("express");
const router = express.Router();
const MagacinController = require("../controllers/magacinController");

router.get("/", MagacinController.getAll);

module.exports = router;
