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
      JSON_BUILD_OBJECT(
        'siframagacina', m.siframagacina,
        'nazivmagacina', m.naziv,
        'tipproizvoda', JSON_BUILD_OBJECT(
          'sifratp', tp.sifratp,
          'nazivtp', tp.naziv
        )
      ) AS magacin,
      pl.datum
    FROM popisnalista pl
    LEFT JOIN magacin m ON m.siframagacina = pl.siframagacina
    LEFT JOIN tipproizvoda tp ON tp.sifratp = m.sifratp`
    );
    return result.rows;
  },

  getById: async (siframagacina, datum) => {
    const result = await pool.query(
      `SELECT
      JSON_BUILD_OBJECT(
        'siframagacina', m.siframagacina,
        'nazivmagacina', m.naziv,
        'tipproizvoda', JSON_BUILD_OBJECT(
          'sifratp', tp.sifratp,
          'nazivtp', tp.naziv
        )
      ) AS magacin,
      pl.datum
    FROM popisnalista pl
    LEFT JOIN magacin m ON m.siframagacina = pl.siframagacina
    LEFT JOIN tipproizvoda tp ON tp.sifratp = m.sifratp
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

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        "DELETE FROM stavkapl WHERE siframagacina = $1 AND datum = $2",
        [siframagacina, datum]
      );

      await client.query(
        "DELETE FROM popisnalista WHERE siframagacina = $1 AND datum = $2",
        [siframagacina, datum]
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  getByGodina: async (godina) => {
    const tableName = `PopisnaLista_${godina}`;

    const result = await pool.query(
      `SELECT
      JSON_BUILD_OBJECT(
        'siframagacina', m.siframagacina,
        'nazivmagacina', m.naziv,
        'tipproizvoda', JSON_BUILD_OBJECT(
          'sifratp', tp.sifratp,
          'nazivtp', tp.naziv
        )
      ) AS magacin,
      pl.datum
    FROM ${tableName} pl
    LEFT JOIN magacin m ON m.siframagacina = pl.siframagacina
    LEFT JOIN tipproizvoda tp ON tp.sifratp = m.sifratp`
    );

    return result.rows;
  },

  getCountByGodina: async (godina) => {
    const tableName = `PopisnaLista_${godina}`;
    const result = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(result.rows[0].count, 10);
  },
};

module.exports = PopisnaListaService;
