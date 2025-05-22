const express = require("express");
const router = express.Router();
const UtrosakRadnihSatiController = require("../controllers/utrosakRadnihSatiController");

router.get("/", UtrosakRadnihSatiController.getAll);
router.get("/:brojds", UtrosakRadnihSatiController.getByBrojds);
router.get("/:brojds/:jmbg/:sifratrs", UtrosakRadnihSatiController.getById);
router.post("/", UtrosakRadnihSatiController.create);
router.put("/:brojds/:jmbg/:sifratrs", UtrosakRadnihSatiController.update);
router.delete("/:brojds/:jmbg/:sifratrs", UtrosakRadnihSatiController.delete);

module.exports = router;
