const TipRadnihSatiService = require("../services/tipRadnihSatiService");

const TipRadnihsSatiController = {
  getAll: async (req, res) => {
    try {
      const tipovirs = await TipRadnihSatiService.getAll();
      res.json(tipovirs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = TipRadnihsSatiController;
