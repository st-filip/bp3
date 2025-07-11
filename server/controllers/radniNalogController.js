const RadniNalogService = require("../services/radniNalogService");

const RadniNalogController = {
  create: async (req, res) => {
    try {
      const {
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
        ukupnosati,
      } = req.body;

      if (
        !datum ||
        !sifraproizvoda ||
        !sifrapogona ||
        planiranakol === undefined ||
        ostvarenakol === undefined ||
        !status ||
        voda === undefined ||
        vodenapara === undefined ||
        elenergija === undefined ||
        !brojtp ||
        !brojts
      ) {
        return res
          .status(500)
          .json({ message: "Sva polja osim ukupnih sati su obavezna." });
      }

      const newRadniNalog = await RadniNalogService.create(
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
        ukupnosati
      );

      res.json(newRadniNalog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const radniNalozi = await RadniNalogService.getAll();
      res.json(radniNalozi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { brojrn } = req.params;
      const radniNalog = await RadniNalogService.getById(brojrn);

      if (!radniNalog) {
        return res.status(404).json({ message: "Radni nalog nije pronađen." });
      }

      res.json(radniNalog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { brojrn } = req.params;
      const {
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
        ukupnosati,
      } = req.body;

      if (
        !datum ||
        !sifraproizvoda ||
        !sifrapogona ||
        planiranakol === undefined ||
        ostvarenakol === undefined ||
        !status ||
        voda === undefined ||
        vodenapara === undefined ||
        elenergija === undefined ||
        !brojtp ||
        !brojts
      ) {
        return res
          .status(400)
          .json({ message: "Sva polja osim ukupnih sati su obavezna." });
      }

      await RadniNalogService.update(
        brojrn,
        datum,
        sifraproizvoda,
        sifrapogona,
        planiranakol,
        ostvarenakol,
        status,
        voda,
        vodenapara,
        elenergija,
        brojtp,
        brojts,
        ukupnosati
      );

      res.json({ message: "Radni nalog je uspešno ažuriran." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { brojrn } = req.params;
      await RadniNalogService.delete(brojrn);

      res.json({ message: "Radni nalog je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getRadniNalogByBrojRN: async (req, res) => {
    try {
      const { brojrn } = req.params;
      const result = await RadniNalogService.getRadniNalogByBrojRN(brojrn);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  getRadniNalogDetaljiByBrojRN: async (req, res) => {
    try {
      const { brojrn } = req.params;
      const result = await RadniNalogService.getRadniNalogDetaljiByBrojRN(
        brojrn
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
};

module.exports = RadniNalogController;
