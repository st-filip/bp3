const express = require("express");
const router = express.Router();
const StavkaPlController = require("../controllers/stavkaPlController");

router.get("/", StavkaPlController.getAll);
router.get(
  "/:siframagacina/:datum",
  StavkaPlController.getStavkeByDatumAndMagacin
);
router.post("/", StavkaPlController.create);
router.put("/:siframagacina/:datum/:rednibroj", StavkaPlController.update);
router.delete("/:siframagacina/:datum/:rednibroj", StavkaPlController.delete);

module.exports = router;
