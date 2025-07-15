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
    const result = await pool.query(
      `SELECT 
      p.sifraproizvoda, 
      p.naziv,
      JSON_BUILD_OBJECT(
        'sifrajm', jm.sifrajm,
        'nazivjm', jm.naziv
      ) AS jedinicamere,
      JSON_BUILD_OBJECT(
        'sifratp', tp.sifratp,
        'nazivtp', tp.naziv
      ) AS tipproizvoda
    FROM proizvod p
    LEFT JOIN jedinicamere jm ON jm.sifrajm = p.sifrajm
    LEFT JOIN tipproizvoda tp ON tp.sifratp = p.sifratp
    WHERE p.naziv NOT ILIKE 'Proizvod%'`
    );
    return result.rows;
  },

  getById: async (sifraproizvoda) => {
    const result = await pool.query(
      `SELECT 
      p.sifraproizvoda, 
      p.naziv,
      JSON_BUILD_OBJECT(
        'sifrajm', jm.sifrajm,
        'nazivjm', jm.naziv
      ) AS jedinicamere,
      JSON_BUILD_OBJECT(
        'sifratp', tp.sifratp,
        'nazivtp', tp.naziv
      ) AS tipproizvoda
    FROM proizvod p
    LEFT JOIN jedinicamere jm ON jm.sifrajm = p.sifrajm
    LEFT JOIN tipproizvoda tp ON tp.sifratp = p.sifratp
    WHERE p.sifraproizvoda = $1`,
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

  getByType: async (sifratp) => {
    const result = await pool.query(
      `SELECT 
      p.sifraproizvoda, 
      p.naziv,
      JSON_BUILD_OBJECT(
        'sifrajm', jm.sifrajm,
        'nazivjm', jm.naziv
      ) AS jedinicamere,
      JSON_BUILD_OBJECT(
        'sifratp', tp.sifratp,
        'nazivtp', tp.naziv
      ) AS tipproizvoda
    FROM proizvod p
    LEFT JOIN jedinicamere jm ON jm.sifrajm = p.sifrajm
    LEFT JOIN tipproizvoda tp ON tp.sifratp = p.sifratp
    WHERE p.sifratp = $1 AND p.naziv NOT ILIKE 'Proizvod%'`,
      [sifratp]
    );
    return result.rows;
  },

  searchByConditions: async (naziv, nazivjm) => {
    const values = [];
    let conditions = [`p.naziv NOT ILIKE 'Proizvod%'`];

    if (naziv) {
      values.push(`%${naziv}%`);
      conditions.push(`p.naziv ILIKE $${values.length}`);
    }

    if (nazivjm) {
      values.push(nazivjm);
      conditions.push(`jm.naziv = $${values.length}`);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const result = await pool.query(
      `SELECT 
      p.sifraproizvoda, 
      p.naziv,
      JSON_BUILD_OBJECT(
        'sifrajm', jm.sifrajm,
        'nazivjm', jm.naziv
      ) AS jedinicamere,
      JSON_BUILD_OBJECT(
        'sifratp', tp.sifratp,
        'nazivtp', tp.naziv
      ) AS tipproizvoda
    FROM proizvod p
    LEFT JOIN jedinicamere jm ON jm.sifrajm = p.sifrajm
    LEFT JOIN tipproizvoda tp ON tp.sifratp = p.sifratp
    ${whereClause}`,
      values
    );

    return result.rows;
  },
};

module.exports = ProivodService;
