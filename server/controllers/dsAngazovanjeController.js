const DsAngazovanjeService = require("../services/dsAngazovanjeService");

const DsAngazovanjeController = {
  getAll: async (req, res) => {
    try {
      const records = await DsAngazovanjeService.getAll();
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getAllForDS: async (req, res) => {
    try {
      const { brojds } = req.params;
      const records = await DsAngazovanjeService.getAllForDS(brojds);
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { brojds, jmbg, sifrauloge } = req.params;
      const record = await DsAngazovanjeService.getById(
        brojds,
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
      const { brojds, jmbg, sifrauloge, napomena } = req.body;

      if (!brojds || !jmbg || !sifrauloge) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newDsAngazovanje = await DsAngazovanjeService.create(
        brojds,
        jmbg,
        sifrauloge,
        napomena
      );

      res.json(newDsAngazovanje);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { brojds, jmbg, sifrauloge } = req.params;
      const { napomena } = req.body;

      await DsAngazovanjeService.update(brojds, jmbg, sifrauloge, napomena);

      res.json({ message: "Napomena je uspešno ažurirana." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { brojds, jmbg, sifrauloge } = req.params;

      await DsAngazovanjeService.delete(brojds, jmbg, sifrauloge);

      res.json({ message: "Uspešno obrisano." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = DsAngazovanjeController;
