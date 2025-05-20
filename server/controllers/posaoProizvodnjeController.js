const PosaoProizvodnjeService = require("../services/posaoProizvodnjeService");

const PosaoProizvodnjeController = {
  getAll: async (req, res) => {
    try {
      const poslovi = await PosaoProizvodnjeService.getAll();
      res.json(poslovi);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = PosaoProizvodnjeController;
