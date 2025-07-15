const pool = require("../db");

const MagacinService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      m.siframagacina, 
      m.naziv, 
      JSON_BUILD_OBJECT(
        'sifratp', tp.sifratp,
        'nazivtp', tp.naziv
      ) AS tipproizvoda
    FROM magacin m
    LEFT JOIN tipproizvoda tp ON tp.sifratp = m.sifratp`
    );
    return result.rows;
  },
};

module.exports = MagacinService;
