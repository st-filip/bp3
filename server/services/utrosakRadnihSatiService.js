const pool = require("../db");

const UtrosakRadnihSatiService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT
      urs.kolicina, urs.brojds,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni,
      JSON_BUILD_OBJECT(
        'sifratrs', trs.sifratrs,
        'naziv', trs.naziv
      ) AS tipradnihsati
    FROM utrosakradnihsati urs
    LEFT JOIN zaposleni z ON z.jmbg = urs.jmbg
    LEFT JOIN tipradnihsati trs ON trs.sifratrs = urs.sifratrs`
    );
    return result.rows;
  },

  getById: async (brojds, jmbg, sifratrs) => {
    const result = await pool.query(
      `SELECT
      urs.kolicina, urs.brojds,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni,
      JSON_BUILD_OBJECT(
        'sifratrs', trs.sifratrs,
        'naziv', trs.naziv
      ) AS tipradnihsati
    FROM utrosakradnihsati urs
    LEFT JOIN zaposleni z ON z.jmbg = urs.jmbg
    LEFT JOIN tipradnihsati trs ON trs.sifratrs = urs.sifratrs
    WHERE urs.brojds = $1 AND urs.jmbg = $2 AND urs.sifratrs = $3`,
      [brojds, jmbg, sifratrs]
    );
    return result.rows[0];
  },

  getByBrojds: async (brojds) => {
    const result = await pool.query(
      `SELECT
      urs.kolicina, urs.brojds,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni,
      JSON_BUILD_OBJECT(
        'sifratrs', trs.sifratrs,
        'naziv', trs.naziv
      ) AS tipradnihsati
    FROM utrosakradnihsati urs
    LEFT JOIN zaposleni z ON z.jmbg = urs.jmbg
    LEFT JOIN tipradnihsati trs ON trs.sifratrs = urs.sifratrs
    WHERE urs.brojds = $1`,
      [brojds]
    );
    return result.rows;
  },

  create: async (brojds, jmbg, sifratrs, kolicina) => {
    const result = await pool.query(
      `
      INSERT INTO utrosakradnihsati (brojds, jmbg, sifratrs, kolicina)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [brojds, jmbg, sifratrs, kolicina]
    );
    return result.rows[0];
  },

  update: async (brojds, jmbg, sifratrs, kolicina) => {
    const result = await pool.query(
      `
      UPDATE utrosakradnihsati
      SET kolicina = $4
      WHERE brojds = $1 AND jmbg = $2 AND sifratrs = $3
      RETURNING *
    `,
      [brojds, jmbg, sifratrs, kolicina]
    );
    return result.rows[0];
  },

  delete: async (brojds, jmbg, sifratrs) => {
    await pool.query(
      `
      DELETE FROM utrosakradnihsati
      WHERE brojds = $1 AND jmbg = $2 AND sifratrs = $3
    `,
      [brojds, jmbg, sifratrs]
    );
  },
};

module.exports = UtrosakRadnihSatiService;
