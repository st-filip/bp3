const UlogaService = require("../services/ulogaService");

const TipRadnihsSatiController = {
  getAll: async (req, res) => {
    try {
      const tipovirs = await UlogaService.getAll();
      res.json(tipovirs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = TipRadnihsSatiController;
