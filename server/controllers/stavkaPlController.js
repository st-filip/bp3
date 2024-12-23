const StavkaPlService = require("../services/stavkaPlService");

const StavkaPlController = {
  getAll: async (req, res) => {
    try {
      const records = await StavkaPlService.getAll();
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getStavkeByDatumAndMagacin: async (req, res) => {
    try {
      const { siframagacina, datum } = req.params;
      const records = await StavkaPlService.getStavkeByDatumAndMagacin(
        siframagacina,
        datum
      );

      if (records.length == 0) {
        return res.status(404).json({ message: "Stavke nisu pronađene." });
      }

      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  create: async (req, res) => {
    try {
      const { siframagacina, datum, kolicina, sifraproizvoda } = req.body;

      if (!siframagacina || !datum || !kolicina || !sifraproizvoda) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newStavkaPl = await StavkaPlService.create(
        siframagacina,
        datum,
        kolicina,
        sifraproizvoda
      );

      res.json(newStavkaPl);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { siframagacina, datum, rednibroj } = req.params;
      const { kolicina } = req.body;

      if (!kolicina) {
        return res.status(400).json({ message: "Polje kolicina je obavezno." });
      }

      await StavkaPlService.update(siframagacina, datum, rednibroj, kolicina);

      res.json({ message: "Kolicina je uspešno ažurirana." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { siframagacina, datum, rednibroj } = req.params;

      await StavkaPlService.delete(siframagacina, datum, rednibroj);

      res.json({ message: "Uspešno obrisano." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = StavkaPlController;
