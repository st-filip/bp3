const express = require("express");
const router = express.Router();
const ZaposleniController = require("../controllers/zaposleniController");

router.post("/", ZaposleniController.create);
router.get("/", ZaposleniController.getAll);
router.get("/tip-zaposlenog", ZaposleniController.getTipoviZaposlenih);
router.get("/:jmbg", ZaposleniController.getById);
router.put("/:jmbg", ZaposleniController.update);
router.delete("/:jmbg", ZaposleniController.delete);

module.exports = router;
