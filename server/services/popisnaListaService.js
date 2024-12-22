const pool = require("../db");

const PopisnaListaService = {
  create: async (siframagacina, datum) => {
    const result = await pool.query(
      "INSERT INTO popisnalista (siframagacina, datum) VALUES ($1, $2) RETURNING *",
      [siframagacina, datum]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        pl.siframagacina, 
        pl.datum
      FROM popisnalista pl`
    );
    return result.rows;
  },

  getById: async (siframagacina, datum) => {
    const result = await pool.query(
      `SELECT 
        pl.siframagacina, 
        pl.datum
      FROM popisnalista pl
      WHERE pl.siframagacina = $1 AND pl.datum = $2`,
      [siframagacina, datum]
    );
    return result.rows[0];
  },

  delete: async (siframagacina, datum) => {
    await pool.query(
      "DELETE FROM popisnalista WHERE siframagacina = $1 AND datum = $2",
      [siframagacina, datum]
    );
  },
};

module.exports = PopisnaListaService;
