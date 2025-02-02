const TipProizvodaService = require("../services/tipProizvodaService");

const TipProizvodaController = {
  getAll: async (req, res) => {
    try {
      const tipovi = await TipProizvodaService.getAll();
      res.json(tipovi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = TipProizvodaController;
