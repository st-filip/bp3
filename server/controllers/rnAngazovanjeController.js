const RnAngazovanjeService = require("../services/rnAngazovanjeService");

const RnAngazovanjeController = {
  getAll: async (req, res) => {
    try {
      const records = await RnAngazovanjeService.getAll();
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getAllForRN: async (req, res) => {
    try {
      const { brojrn } = req.params;
      const records = await RnAngazovanjeService.getAllForRN(brojrn);
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { brojrn, jmbg, sifrauloge } = req.params;
      const record = await RnAngazovanjeService.getById(
        brojrn,
        jmbg,
        sifrauloge
      );

      if (!record) {
        return res.status(404).json({ message: "Angažovanje nije pronađeno." });
      }

      res.json(record);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  create: async (req, res) => {
    try {
      const { brojrn, jmbg, sifrauloge } = req.body;

      if (!brojrn || !jmbg || !sifrauloge) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newRnAngazovanje = await RnAngazovanjeService.create(
        brojrn,
        jmbg,
        sifrauloge
      );

      res.json(newRnAngazovanje);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { brojrn, jmbg, sifrauloge } = req.params;

      await RnAngazovanjeService.delete(brojrn, jmbg, sifrauloge);

      res.json({ message: "Uspešno obrisano." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = RnAngazovanjeController;
