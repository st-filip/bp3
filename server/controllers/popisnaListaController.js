const PopisnaListaService = require("../services/popisnaListaService");

const PopisnaListaController = {
  create: async (req, res) => {
    try {
      const { siframagacina, datum } = req.body;

      if (!siframagacina || !datum) {
        return res.status(400).json({ message: "Sva polja su obavezna." });
      }

      const newPopisnaLista = await PopisnaListaService.create(
        siframagacina,
        datum
      );
      res.json(newPopisnaLista);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const popisneListe = await PopisnaListaService.getAll();
      res.json(popisneListe);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { siframagacina, datum } = req.params;
      const popisnaLista = await PopisnaListaService.getById(
        siframagacina,
        datum
      );

      if (!popisnaLista) {
        return res
          .status(404)
          .json({ message: "Popisna lista nije pronađena." });
      }

      res.json(popisnaLista);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const { siframagacina, datum } = req.params;
      await PopisnaListaService.delete(siframagacina, datum);

      res.json({ message: "Popisna lista je uspešno obrisana." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = PopisnaListaController;
