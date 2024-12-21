const pool = require("../db");

const ProivodService = {
  create: async (naziv, sifrajm, sifratp) => {
    const result = await pool.query(
      "INSERT INTO proizvod (naziv, sifrajm, sifratp) VALUES($1, $2, $3) RETURNING *",
      [naziv, sifrajm, sifratp]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query("SELECT * FROM proizvod");
    return result.rows;
  },

  getAllValid: async () => {
    const result = await pool.query(
      "SELECT * FROM proizvod WHERE naziv NOT ILIKE 'Proizvod%'"
    );
    return result.rows;
  },

  getById: async (sifraproizvoda) => {
    const result = await pool.query(
      "SELECT * FROM proizvod WHERE sifraproizvoda = $1",
      [sifraproizvoda]
    );
    return result.rows[0];
  },

  update: async (sifraproizvoda, naziv, sifrajm, sifratp) => {
    await pool.query(
      "UPDATE proizvod SET naziv = $1, sifrajm = $2, sifratp = $3 WHERE sifraproizvoda = $4",
      [naziv, sifrajm, sifratp, sifraproizvoda]
    );
  },

  delete: async (sifraproizvoda) => {
    await pool.query("DELETE FROM proizvod WHERE sifraproizvoda = $1", [
      sifraproizvoda,
    ]);
  },
};

module.exports = ProivodService;
