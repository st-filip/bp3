const ZaposleniService = require("../services/zaposleniService");

const ZaposleniController = {
  create: async (req, res) => {
    try {
      const { jmbg, imeprezime, nazivtipazaposlenog } = req.body;

      if (!jmbg || !imeprezime || !nazivtipazaposlenog) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newZaposleni = await ZaposleniService.create(
        jmbg,
        imeprezime,
        nazivtipazaposlenog
      );

      res.json(newZaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getAll: async (req, res) => {
    try {
      const zaposleni = await ZaposleniService.getAll();
      res.json(zaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getAllValid: async (req, res) => {
    try {
      const zaposleni = await ZaposleniService.getAllValid();
      res.json(zaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getById: async (req, res) => {
    try {
      const { jmbg } = req.params;
      const zaposleni = await ZaposleniService.getById(jmbg);

      if (!zaposleni) {
        return res.status(404).json({ message: "Zaposleni nije pronađen." });
      }

      res.json(zaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  update: async (req, res) => {
    try {
      const { jmbg } = req.params;
      const { imeprezime, nazivtipazaposlenog } = req.body;

      if (!imeprezime || !nazivtipazaposlenog) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      await ZaposleniService.update(jmbg, imeprezime, nazivtipazaposlenog);

      res.json({ message: "Zaposleni je uspešno ažuriran." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  delete: async (req, res) => {
    try {
      const { jmbg } = req.params;
      const deleted = await ZaposleniService.delete(jmbg);

      res.json({ message: "Zaposleni je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = ZaposleniController;
