const MagacinService = require("../services/magacinService");

const MagacinController = {
  getAll: async (req, res) => {
    try {
      const magacini = await MagacinService.getAll();
      res.json(magacini);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = MagacinController;
