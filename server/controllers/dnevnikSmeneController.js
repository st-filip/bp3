const DnevnikSmeneService = require("../services/dnevnikSmeneService");

const DnevnikSmeneController = {
  create: async (req, res) => {
    try {
      const { datum, brojrn } = req.body;

      if (!datum || !brojrn) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newDnevnikSmene = await DnevnikSmeneService.create(datum, brojrn);

      res.json(newDnevnikSmene);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const dnevnikSmene = await DnevnikSmeneService.getAll();
      res.json(dnevnikSmene);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { brojds } = req.params;
      const dnevnik = await DnevnikSmeneService.getById(brojds);

      if (!dnevnik) {
        return res
          .status(404)
          .json({ message: "Dnevnik smene nije pronađen." });
      }

      res.json(dnevnik);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const { brojds } = req.params;
      const { datum, brojrn, sifrapogona } = req.body;

      if (!datum || !brojrn) {
        return res
          .status(400)
          .json({ message: "Sva polja osim šifre pogona su obavezna." });
      }

      await DnevnikSmeneService.update(brojds, datum, brojrn, sifrapogona);

      res.json({ message: "Dnevnik smene je uspešno ažuriran." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { brojds } = req.params;
      await DnevnikSmeneService.delete(brojds);

      res.json({ message: "Dnevnik smene je uspešno obrisan." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = DnevnikSmeneController;
