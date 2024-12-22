const pool = require("../db");

const ProizvodniPogonService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM proizvodnipogon");
    return result.rows;
  },
};

module.exports = ProizvodniPogonService;
