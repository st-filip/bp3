const express = require("express");
const router = express.Router();
const PosaoProizvodnjeController = require("../controllers/posaoProizvodnjeController");

router.get("/", PosaoProizvodnjeController.getAll);

module.exports = router;
