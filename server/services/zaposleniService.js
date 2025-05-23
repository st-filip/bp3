const pool = require("../db");

const ZaposleniService = {
  create: async (jmbg, imeprezime, nazivtipazaposlenog) => {
    const result = await pool.query(
      "INSERT INTO zaposleni (jmbg, imeprezime, nazivtipazaposlenog) VALUES($1, $2, $3) RETURNING *",
      [jmbg, imeprezime, nazivtipazaposlenog]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query(
      "SELECT * FROM zaposleni WHERE imeprezime NOT ILIKE 'Ime%'"
    );
    return result.rows;
  },

  getById: async (jmbg) => {
    const result = await pool.query("SELECT * FROM zaposleni WHERE jmbg = $1", [
      jmbg,
    ]);
    return result.rows[0];
  },

  update: async (jmbg, imeprezime, nazivtipazaposlenog) => {
    await pool.query(
      "UPDATE zaposleni SET imeprezime = $1, nazivtipazaposlenog = $2 WHERE jmbg = $3",
      [imeprezime, nazivtipazaposlenog, jmbg]
    );
  },

  delete: async (jmbg) => {
    await pool.query("DELETE FROM zaposleni WHERE jmbg = $1", [jmbg]);
  },

  getTipoviZaposlenih: async () => {
    const result = await pool.query(
      `SELECT substring(pg_get_constraintdef(oid) from '\\{(.*)\\}')
      FROM pg_constraint
      WHERE conname = 'chk_nazivtipazaposlenog'
      AND conrelid = 'zaposleni'::regclass;`
    );

    const tipovi = result.rows[0]?.substring?.split(",") || [];
    return tipovi;
  },

  createTipZaposlenog: async (naziv) => {
    try {
      await pool.query("CALL update_check_ogranicenje_zaposleni($1)", [naziv]);
    } catch (error) {
      console.error("Greška pri kreiranju tipa zaposlenog:", error.message);
    }
  },
};

module.exports = ZaposleniService;
