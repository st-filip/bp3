const pool = require("../db");

const TehnickaSpecifikacijaService = {
  getAll: async () => {
    const result = await pool.query(`SELECT * FROM tehnickaspecifikacija`);
    return result.rows;
  },
};

module.exports = TehnickaSpecifikacijaService;
