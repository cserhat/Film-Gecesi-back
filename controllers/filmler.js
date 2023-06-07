import { db } from "../db.js"


export const getFilmler = (req, res) => {
    const q = `
    SELECT f.*, GROUP_CONCAT(k.ad SEPARATOR ', ') AS kategoriler
    FROM filmler f
    LEFT JOIN film_kategori fk ON f.id = fk.film_id
    LEFT JOIN kategoriler k ON fk.kategori_id = k.id
    GROUP BY f.id
    `;
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json({ error: "Veritabanı hatası" });
      return res.status(200).json(data);
    });
  };
  
  
  
  
  export const getFilm = (req, res) => {
    const slug = req.params.slug;
    
    const q = `
      SELECT f.id, f.baslik, f.slug, f.yonetmen, f.afis, f.ozet, f.yil, GROUP_CONCAT(k.ad SEPARATOR ', ') AS kategoriler
      FROM filmler f
      LEFT JOIN film_kategori fk ON f.id = fk.film_id
      LEFT JOIN kategoriler k ON fk.kategori_id = k.id
      WHERE f.slug = ?
      GROUP BY f.id
      LIMIT 1
    `;
    
    db.query(q, [slug], (err, data) => {
      if (err) return res.status(500).json({ error: "Veritabanı hatası" });
      
      if (data.length === 0) {
        return res.status(404).json({ error: "Film bulunamadı" });
      }
      
      const film = data[0];
      return res.status(200).json(film);
    });
  };

export const addFilm = (req, res) =>
{
    res.json("from controller")
}

export const deleteFilm = (req, res) =>
{
    res.json("from controller")
}

export const putFilm = (req, res) =>
{
    res.json("from controller")
}