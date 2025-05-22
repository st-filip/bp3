const UtrosakRadnihSatiService = require("../services/utrosakRadnihSatiService");

const UtrosakRadnihSatiController = {
  getAll: async (req, res) => {
    try {
      const data = await UtrosakRadnihSatiService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByBrojds: async (req, res) => {
    try {
      const { brojds } = req.params;
      const data = await UtrosakRadnihSatiService.getByBrojds(brojds);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { brojds, jmbg, sifratrs } = req.params;
      const data = await UtrosakRadnihSatiService.getById(
        brojds,
        jmbg,
        sifratrs
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { brojds, jmbg, sifratrs, kolicina } = req.body;
      const data = await UtrosakRadnihSatiService.create(
        brojds,
        jmbg,
        sifratrs,
        kolicina
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { brojds, jmbg, sifratrs } = req.params;
      const { kolicina } = req.body;
      const data = await UtrosakRadnihSatiService.update(
        brojds,
        jmbg,
        sifratrs,
        kolicina
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { brojds, jmbg, sifratrs } = req.params;
      await UtrosakRadnihSatiService.delete(brojds, jmbg, sifratrs);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UtrosakRadnihSatiController;
