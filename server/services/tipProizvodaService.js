const pool = require("../db");

const TipProizvodaService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM tipproizvoda");
    return result.rows;
  },
};

module.exports = TipProizvodaService;
