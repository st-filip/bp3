const express = require("express");
const router = express.Router();
const ProizvodController = require("../controllers/proizvodController");

router.post("/", ProizvodController.create);
router.get("/", ProizvodController.getAll);
router.get("/tip/:sifratp", ProizvodController.getByType);
router.get("/:sifraproizvoda", ProizvodController.getById);
router.put("/:sifraproizvoda", ProizvodController.update);
router.delete("/:sifraproizvoda", ProizvodController.delete);

module.exports = router;
