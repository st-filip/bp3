const pool = require("../db");
const { getById } = require("./radniNalogService");

const RnAngazovanjeService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        rn.brojrn, 
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = rn.sifrauloge) uloga) AS uloga,
        (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg, imeprezime 
                FROM zaposleni 
                WHERE jmbg = rn.jmbg) zaposleni) AS zaposleni
        FROM rnangazovanje rn`
    );
    return result.rows;
  },

  getAllForRN: async (brojrn) => {
    const result = await pool.query(
      `SELECT 
        rn.brojrn, 
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = rn.sifrauloge) uloga) AS uloga,
        (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg, imeprezime 
                FROM zaposleni 
                WHERE jmbg = rn.jmbg) zaposleni) AS zaposleni
        FROM rnangazovanje rn
        WHERE rn.brojrn=$1`,
      [brojrn]
    );
    return result.rows;
  },

  getById: async (brojrn, jmbg, sifrauloge) => {
    const result = await pool.query(
      `SELECT 
        rn.brojrn, 
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = rn.sifrauloge) uloga) AS uloga,
        (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg, imeprezime 
                FROM zaposleni 
                WHERE jmbg = rn.jmbg) zaposleni) AS zaposleni
        FROM rnangazovanje rn
        WHERE rn.brojrn = $1 and jmbg = $2 and sifrauloge = $3`,
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
