const express = require("express");
const router = express.Router();
const RnAngazovanjeController = require("../controllers/rnAngazovanjeController");

router.get("/", RnAngazovanjeController.getAll);
router.get("/:brojrn", RnAngazovanjeController.getAllForRN);
router.get("/:brojrn/:jmbg/:sifrauloge", RnAngazovanjeController.getById);
router.post("/", RnAngazovanjeController.create);
router.delete("/:brojrn/:jmbg/:sifrauloge", RnAngazovanjeController.delete);

module.exports = router;
