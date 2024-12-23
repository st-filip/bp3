const TehnoloskiPostupakService = require("../services/tehnoloskiPostupakService");

const TehnoloskiPostupakController = {
  getAll: async (req, res) => {
    try {
      const postupci = await TehnoloskiPostupakService.getAll();
      res.json(postupci);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = TehnoloskiPostupakController;
