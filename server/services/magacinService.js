const pool = require("../db");

const MagacinService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        m.siframagacina, 
        m.naziv, 
        (SELECT ROW_TO_JSON(tp_object) 
         FROM (
           SELECT sifratp, naziv AS nazivtp 
           FROM tipproizvoda 
           WHERE sifratp = m.sifratp
         ) tp_object) AS tipproizvoda
       FROM magacin m`
    );
    return result.rows;
  },
};

module.exports = MagacinService;
