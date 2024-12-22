const JedinicaMereService = require("../services/jedinicaMereService");

const JedinicaMereController = {
  getAll: async (req, res) => {
    try {
      const jedinice = await JedinicaMereService.getAll();
      res.json(jedinice);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = JedinicaMereController;
