const StavkaPpService = require("../services/stavkaPpService");

const StavkaPpController = {
  getAll: async (req, res) => {
    try {
      const records = await StavkaPpService.getAll();
      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getByBrojDS: async (req, res) => {
    try {
      const { brojds } = req.params;
      const records = await StavkaPpService.getByBrojDS(brojds);

      if (records.length === 0) {
        return res.status(404).json({ message: "Stavke nisu pronađene." });
      }

      res.json(records);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { brojds, rednibroj } = req.params;
      const record = await StavkaPpService.getById(brojds, rednibroj);

      if (!record) {
        return res.status(404).json({ message: "Stavka nije pronađena." });
      }

      res.json(record);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  create: async (req, res) => {
    try {
      const {
        brojds,
        ostvarenakol,
        vremeod,
        vremedo,
        brojradnika,
        sifraposla,
      } = req.body;

      if (
        !brojds ||
        !ostvarenakol ||
        !vremeod ||
        !vremedo ||
        !brojradnika ||
        !sifraposla
      ) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newRecord = await StavkaPpService.create(
        brojds,
        ostvarenakol,
        vremeod,
        vremedo,
        brojradnika,
        sifraposla
      );
      res.json(newRecord);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { brojds, rednibroj } = req.params;
      const { ostvarenakol, vremeod, vremedo, brojradnika, sifraposla } =
        req.body;

      if (
        !vremeod ||
        !vremedo ||
        !ostvarenakol ||
        !brojradnika ||
        !sifraposla
      ) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      await StavkaPpService.update(
        brojds,
        rednibroj,
        ostvarenakol,
        vremeod,
        vremedo,
        brojradnika,
        sifraposla
      );

      res.json({ message: "Stavka je uspešno ažurirana." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { brojds, rednibroj } = req.params;

      await StavkaPpService.delete(brojds, rednibroj);

      res.json({ message: "Stavka uspešno obrisana." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = StavkaPpController;
