const pool = require("../db");

const StavkaPpService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      s.brojds,
      s.rednibroj,
      s.ostvarenakol,
      get_vreme_od(s.intervalrada) AS VremeOd, 
      get_vreme_do(s.intervalrada) AS VremeDo, 
      s.brojradnika,
      JSON_BUILD_OBJECT(
        'sifraposla', pp.sifraposla,
        'naziv', pp.naziv
      ) AS posaoproizvodnje
    FROM stavkapp s
    LEFT JOIN posaoproizvodnje pp ON pp.sifraposla = s.sifraposla`
    );
    return result.rows;
  },

  getById: async (brojds, rednibroj) => {
    const result = await pool.query(
      `SELECT 
      s.brojds,
      s.rednibroj,
      s.ostvarenakol,
      get_vreme_od(s.intervalrada) AS VremeOd, 
      get_vreme_do(s.intervalrada) AS VremeDo, 
      s.brojradnika,
      JSON_BUILD_OBJECT(
        'sifraposla', pp.sifraposla,
        'naziv', pp.naziv
      ) AS posao
    FROM stavkapp s
    LEFT JOIN posaoproizvodnje pp ON pp.sifraposla = s.sifraposla
    WHERE s.brojds = $1 AND s.rednibroj = $2`,
      [brojds, rednibroj]
    );
    return result.rows[0];
  },

  getByBrojDS: async (brojds) => {
    const result = await pool.query(
      `SELECT 
      s.brojds,
      s.rednibroj,
      s.ostvarenakol,
      get_vreme_od(s.intervalrada) AS VremeOd, 
      get_vreme_do(s.intervalrada) AS VremeDo, 
      s.brojradnika,
      JSON_BUILD_OBJECT(
        'sifraposla', pp.sifraposla,
        'naziv', pp.naziv
      ) AS posao
    FROM stavkapp s
    LEFT JOIN posaoproizvodnje pp ON pp.sifraposla = s.sifraposla
    WHERE s.brojds = $1`,
      [brojds]
    );
    return result.rows;
  },

  getNextRedniBroj: async (brojds) => {
    const result = await pool.query(
      `SELECT COALESCE(MAX(rednibroj), 0) + 1 AS nextrednibroj 
       FROM stavkapp 
       WHERE brojds = $1`,
      [brojds]
    );
    return result.rows[0].nextrednibroj;
  },

  create: async (
    brojds,
    ostvarenaKol,
    vremeOd,
    vremeDo,
    brojRadnika,
    sifraPosla
  ) => {
    const redniBroj = await StavkaPpService.getNextRedniBroj(brojds);
    const result = await pool.query(
      `INSERT INTO stavkapp (brojds, rednibroj, ostvarenaKol, intervalRada, brojRadnika, sifraPosla)
     VALUES ($1, $2, $3, set_vremenski_interval($4, $5), $6, $7)
     RETURNING *`,
      [
        brojds,
        redniBroj,
        ostvarenaKol,
        vremeOd,
        vremeDo,
        brojRadnika,
        sifraPosla,
      ]
    );
    return result.rows[0];
  },

  update: async (
    brojds,
    redniBroj,
    ostvarenaKol,
    vremeOd,
    vremeDo,
    brojRadnika,
    sifraPosla
  ) => {
    await pool.query(
      `UPDATE stavkapp 
     SET ostvarenaKol = $1, intervalRada = set_vremenski_interval($2, $3), brojRadnika = $4, sifraPosla = $5
     WHERE brojds = $6 AND rednibroj = $7`,
      [
        ostvarenaKol,
        vremeOd,
        vremeDo,
        brojRadnika,
        sifraPosla,
        brojds,
        redniBroj,
      ]
    );
  },

  delete: async (brojds, rednibroj) => {
    await pool.query(
      `DELETE FROM stavkapp WHERE brojds = $1 AND rednibroj = $2`,
      [brojds, rednibroj]
    );
  },
};

module.exports = StavkaPpService;
