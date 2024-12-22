const pool = require("../db");

const JedinicaMereService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM jedinicamere");
    return result.rows;
  },
};

module.exports = JedinicaMereService;
