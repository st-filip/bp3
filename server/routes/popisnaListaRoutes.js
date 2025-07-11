const express = require("express");
const router = express.Router();
const PopisnaListaController = require("../controllers/popisnaListaController");

router.post("/", PopisnaListaController.create);
router.get("/", PopisnaListaController.getAll);
router.get("/godina/:godina", PopisnaListaController.getByGodina);
router.get("/godina/:godina/count", PopisnaListaController.getCountByGodina);
router.get("/:siframagacina/:datum", PopisnaListaController.getById);
router.delete("/:siframagacina/:datum", PopisnaListaController.delete);

module.exports = router;
