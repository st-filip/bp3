const express = require("express");
const router = express.Router();
const TehnoloskiPostupakController = require("../controllers/tehnoloskiPostupakController");

router.get("/", TehnoloskiPostupakController.getAll);

module.exports = router;
