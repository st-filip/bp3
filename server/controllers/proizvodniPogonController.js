const ProizvodniPogonService = require("../services/proizvodniPogonService");

const ProizvodniPogonController = {
  getAll: async (req, res) => {
    try {
      const pogoni = await ProizvodniPogonService.getAll();
      res.json(pogoni);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = ProizvodniPogonController;
