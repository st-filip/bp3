const pool = require("../db");

const UlogaService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM uloga");
    return result.rows;
  },
};

module.exports = UlogaService;
