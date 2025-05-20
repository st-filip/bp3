const express = require("express");
const router = express.Router();
const StavkaPpController = require("../controllers/stavkaPpController");

router.get("/", StavkaPpController.getAll);
router.get("/:brojds", StavkaPpController.getByBrojDS);
router.get("/:brojds/:rednibroj", StavkaPpController.getById);
router.post("/", StavkaPpController.create);
router.put("/:brojds/:rednibroj", StavkaPpController.update);
router.delete("/:brojds/:rednibroj", StavkaPpController.delete);

module.exports = router;
