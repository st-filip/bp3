const pool = require("../db");

const UtrosakRadnihSatiService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT
        urs.kolicina, urs.brojds,
        (SELECT ROW_TO_JSON(z_obj)
         FROM (
           SELECT z.jmbg, z.imeprezime
           FROM zaposleni z
           WHERE z.jmbg = urs.jmbg
         ) z_obj
        ) AS zaposleni,
        (SELECT ROW_TO_JSON(trs_obj)
         FROM (
           SELECT trs.sifratrs, trs.naziv
           FROM tipradnihsati trs
           WHERE trs.sifratrs = urs.sifratrs
         ) trs_obj
        ) AS tipradnihsati
      FROM utrosakradnihsati urs`
    );

    return result.rows;
  },

  getById: async (brojds, jmbg, sifratrs) => {
    const result = await pool.query(
      `SELECT
      urs.kolicina, urs.brojds,
        (SELECT ROW_TO_JSON(z_obj)
         FROM (
           SELECT z.jmbg, z.imeprezime
           FROM zaposleni z
           WHERE z.jmbg = urs.jmbg
         ) z_obj
        ) AS zaposleni,

        (SELECT ROW_TO_JSON(trs_obj)
         FROM (
           SELECT trs.sifratrs, trs.naziv
           FROM tipradnihsati trs
           WHERE trs.sifratrs = urs.sifratrs
         ) trs_obj
        ) AS tipradnihsati

      FROM utrosakradnihsati urs
      WHERE urs.brojds = $1 AND urs.jmbg = $2 AND urs.sifratrs = $3
    `,
      [brojds, jmbg, sifratrs]
    );

    return result.rows[0];
  },

  getByBrojds: async (brojds) => {
    const result = await pool.query(
      `SELECT
      urs.kolicina, urs.brojds,
      (SELECT ROW_TO_JSON(z_obj)
       FROM (
         SELECT z.jmbg, z.imeprezime
         FROM zaposleni z
         WHERE z.jmbg = urs.jmbg
       ) z_obj
      ) AS zaposleni,
      (SELECT ROW_TO_JSON(trs_obj)
       FROM (
         SELECT trs.sifratrs, trs.naziv
         FROM tipradnihsati trs
         WHERE trs.sifratrs = urs.sifratrs
       ) trs_obj
      ) AS tipradnihsati
    FROM utrosakradnihsati urs
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
