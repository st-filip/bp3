const express = require("express");
const router = express.Router();
const DnevnikSmeneController = require("../controllers/dnevnikSmeneController");

router.post("/", DnevnikSmeneController.create);
router.get("/", DnevnikSmeneController.getAll);
router.get("/:brojds", DnevnikSmeneController.getById);
router.put("/:brojds", DnevnikSmeneController.update);
router.delete("/:brojds", DnevnikSmeneController.delete);

module.exports = router;
