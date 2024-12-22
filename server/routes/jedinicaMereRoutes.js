const express = require("express");
const router = express.Router();
const JedinicaMereController = require("../controllers/jedinicaMereController");

router.get("/", JedinicaMereController.getAll);

module.exports = router;
