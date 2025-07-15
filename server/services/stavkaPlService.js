const pool = require("../db");

const StavkaPlService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      sp.siframagacina, 
      sp.datum, 
      sp.rednibroj, 
      sp.kolicina,
      JSON_BUILD_OBJECT(
        'sifraproizvoda', p.sifraproizvoda,
        'naziv', p.naziv
      ) AS proizvod
    FROM stavkapl sp
    LEFT JOIN proizvod p ON p.sifraproizvoda = sp.sifraproizvoda`
    );
    return result.rows;
  },

  getStavkeByDatumAndMagacin: async (siframagacina, datum) => {
    const result = await pool.query(
      `SELECT 
      sp.siframagacina, 
      sp.datum, 
      sp.rednibroj, 
      sp.kolicina,
      JSON_BUILD_OBJECT(
        'sifraproizvoda', p.sifraproizvoda,
        'naziv', p.naziv
      ) AS proizvod
    FROM stavkapl sp
    LEFT JOIN proizvod p ON p.sifraproizvoda = sp.sifraproizvoda
    WHERE sp.siframagacina = $1 AND sp.datum = $2`,
      [siframagacina, datum]
    );
    return result.rows;
  },

  getById: async (siframagacina, datum, rednibroj) => {
    const result = await pool.query(
      `SELECT 
      sp.siframagacina, 
      sp.datum, 
      sp.rednibroj, 
      sp.kolicina,
      JSON_BUILD_OBJECT(
        'sifraproizvoda', p.sifraproizvoda,
        'naziv', p.naziv
      ) AS proizvod
    FROM stavkapl sp
    LEFT JOIN proizvod p ON p.sifraproizvoda = sp.sifraproizvoda
    WHERE sp.siframagacina = $1 AND sp.datum = $2 AND sp.rednibroj = $3`,
      [siframagacina, datum, rednibroj]
    );
    return result.rows[0];
  },

  getNextRedniBroj: async (siframagacina, datum) => {
    const result = await pool.query(
      "SELECT COALESCE(MAX(rednibroj), 0) + 1 AS nextRedniBroj FROM stavkapl WHERE siframagacina = $1 AND datum = $2",
      [siframagacina, datum]
    );
    return result.rows[0].nextrednibroj;
  },

  create: async (siframagacina, datum, kolicina, sifraproizvoda) => {
    const rednibroj = await StavkaPlService.getNextRedniBroj(
      siframagacina,
      datum
    );
    const result = await pool.query(
      "INSERT INTO stavkapl (siframagacina, datum, rednibroj, kolicina, sifraproizvoda) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [siframagacina, datum, rednibroj, kolicina, sifraproizvoda]
    );
    return result.rows[0];
  },

  update: async (siframagacina, datum, rednibroj, kolicina) => {
    await pool.query(
      "UPDATE stavkapl SET kolicina = $1 WHERE siframagacina = $2 AND datum = $3 AND rednibroj = $4",
      [kolicina, siframagacina, datum, rednibroj]
    );
  },

  delete: async (siframagacina, datum, rednibroj) => {
    await pool.query(
      "DELETE FROM stavkapl WHERE siframagacina = $1 AND datum = $2 AND rednibroj = $3",
      [siframagacina, datum, rednibroj]
    );
  },
};

module.exports = StavkaPlService;
