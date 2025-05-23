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
      res.status(500).send(error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const zaposleni = await ZaposleniService.getAll();
      res.json(zaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
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
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { jmbg } = req.params;
      await ZaposleniService.delete(jmbg);

      res.json({ message: "Zaposleni je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getTipoviZaposlenih: async (req, res) => {
    try {
      const tipovi = await ZaposleniService.getTipoviZaposlenih();
      res.json(tipovi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  createTipZaposlenog: async (req, res) => {
    try {
      const { naziv } = req.body;

      if (!naziv) {
        return res
          .status(400)
          .json({ message: "Naziv tipa zaposlenog je obavezan." });
      }

      await ZaposleniService.createTipZaposlenog(naziv);

      return res.status(201).json({ message: "Tip zaposlenog uspešno dodat." });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send({
          message: "Greška pri dodavanju tipa zaposlenog: " + error.message,
        });
    }
  },

  searchByConditions: async (req, res) => {
    try {
      const { imeprezime, nazivtipazaposlenog } = req.query;

      if (!imeprezime && !nazivtipazaposlenog) {
        const zaposleni = await ZaposleniService.getAll();
        return res.json(zaposleni);
      }

      const zaposleni = await ZaposleniService.searchByConditions(
        imeprezime,
        nazivtipazaposlenog
      );
      res.json(zaposleni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = ZaposleniController;
