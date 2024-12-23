const pool = require("../db");

const TipRadnihSatiService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM tipradnihsati");
    return result.rows;
  },
};

module.exports = TipRadnihSatiService;
