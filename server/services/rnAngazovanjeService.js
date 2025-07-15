const pool = require("../db");
const { getById } = require("./radniNalogService");

const RnAngazovanjeService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
      rn.brojrn, 
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni
    FROM rnangazovanje rn
    LEFT JOIN uloga u ON u.sifrauloge = rn.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = rn.jmbg`
    );
    return result.rows;
  },

  getAllForRN: async (brojrn) => {
    const result = await pool.query(
      `SELECT 
      rn.brojrn, 
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni
    FROM rnangazovanje rn
    LEFT JOIN uloga u ON u.sifrauloge = rn.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = rn.jmbg
    WHERE rn.brojrn = $1`,
      [brojrn]
    );
    return result.rows;
  },

  getById: async (brojrn, jmbg, sifrauloge) => {
    const result = await pool.query(
      `SELECT 
      rn.brojrn, 
      JSON_BUILD_OBJECT(
        'sifrauloge', u.sifrauloge,
        'nazivuloge', u.naziv
      ) AS uloga,
      JSON_BUILD_OBJECT(
        'jmbg', z.jmbg,
        'imeprezime', z.imeprezime
      ) AS zaposleni
    FROM rnangazovanje rn
    LEFT JOIN uloga u ON u.sifrauloge = rn.sifrauloge
    LEFT JOIN zaposleni z ON z.jmbg = rn.jmbg
    WHERE rn.brojrn = $1 AND z.jmbg = $2 AND u.sifrauloge = $3`,
      [brojrn, jmbg, sifrauloge]
    );
    return result.rows[0];
  },

  create: async (brojrn, jmbg, sifrauloge) => {
    const result = await pool.query(
      "INSERT INTO rnangazovanje (brojrn, jmbg, sifrauloge) VALUES($1, $2, $3) RETURNING *",
      [brojrn, jmbg, sifrauloge]
    );
    return result.rows[0];
  },

  delete: async (brojrn, jmbg, sifrauloge) => {
    await pool.query(
      "DELETE FROM rnangazovanje WHERE brojrn = $1 AND jmbg = $2 AND sifrauloge = $3",
      [brojrn, jmbg, sifrauloge]
    );
  },
};

module.exports = RnAngazovanjeService;
