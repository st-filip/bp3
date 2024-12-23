const express = require("express");
const router = express.Router();
const TipRadnihsSatiController = require("../controllers/tipRadnihSatiController");

router.get("/", TipRadnihsSatiController.getAll);

module.exports = router;
