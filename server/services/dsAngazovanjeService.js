const pool = require("../db");

const DsAngazovanjeService = {
  getAll: async () => {
    const result = await pool.query(
      `SELECT 
        ds.brojds, 
        ds.jmbg,
        ds.napomena,
        ds.imeprezime,
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = ds.sifrauloge) uloga) AS uloga,
         (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg 
                FROM zaposleni 
                WHERE jmbg = ds.jmbg) zaposleni) AS zaposleni
       FROM dsangazovanje ds`
    );
    return result.rows;
  },

  getAllForDS: async (brojds) => {
    const result = await pool.query(
      `SELECT 
        ds.brojds, 
        ds.jmbg,
        ds.napomena,
        ds.imeprezime,
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = ds.sifrauloge) uloga) AS uloga,
          (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg 
                FROM zaposleni 
                WHERE jmbg = ds.jmbg) zaposleni) AS zaposleni
       FROM dsangazovanje ds
        WHERE ds.brojds=$1`,
      [brojds]
    );
    return result.rows;
  },

  getById: async (brojds, jmbg, sifrauloge) => {
    const result = await pool.query(
      `SELECT 
        ds.brojds, 
        ds.jmbg,
        ds.napomena,
        ds.imeprezime,
        (SELECT ROW_TO_JSON(uloga) 
         FROM (SELECT sifrauloge, naziv AS nazivuloge FROM uloga WHERE sifrauloge = ds.sifrauloge) uloga) AS uloga,
          (SELECT ROW_TO_JSON(zaposleni) 
        FROM (SELECT jmbg 
                FROM zaposleni 
                WHERE jmbg = ds.jmbg) zaposleni) AS zaposleni
       FROM dsangazovanje ds
        WHERE ds.brojds = $1 and jmbg = $2 and sifrauloge = $3`,
      [brojds, jmbg, sifrauloge]
    );
    return result.rows[0];
  },

  create: async (brojds, jmbg, sifrauloge, napomena) => {
    const result = await pool.query(
      "INSERT INTO dsangazovanje (brojds, jmbg, sifrauloge, napomena) VALUES($1, $2, $3, $4) RETURNING *",
      [brojds, jmbg, sifrauloge, napomena]
    );
    return result.rows[0];
  },

  update: async (brojds, jmbg, sifrauloge, napomena) => {
    await pool.query(
      "UPDATE dsangazovanje SET napomena = $1 WHERE brojds = $2 AND jmbg = $3 AND sifrauloge = $4",
      [napomena, brojds, jmbg, sifrauloge]
    );
  },

  delete: async (brojds, jmbg, sifrauloge) => {
    await pool.query(
      "DELETE FROM dsangazovanje WHERE brojds = $1 AND jmbg = $2 AND sifrauloge = $3",
      [brojds, jmbg, sifrauloge]
    );
  },
};

module.exports = DsAngazovanjeService;
