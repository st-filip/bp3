const pool = require("../db");

const TehnoloskiPostupakService = {
  getAll: async () => {
    const result = await pool.query(`SELECT * FROM tehnoloskipostupak`);
    return result.rows;
  },
};

module.exports = TehnoloskiPostupakService;
