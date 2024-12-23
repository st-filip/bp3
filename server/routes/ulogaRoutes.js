const express = require("express");
const router = express.Router();
const UlogaController = require("../controllers/ulogaController");

router.get("/", UlogaController.getAll);

module.exports = router;
