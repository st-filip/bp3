const TehnickaSpecifikacijaService = require("../services/tehnickaSpecifikacijaService");

const TehnickaSpecifikacijaController = {
  getAll: async (req, res) => {
    try {
      const specifikacije = await TehnickaSpecifikacijaService.getAll();
      res.json(specifikacije);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = TehnickaSpecifikacijaController;
