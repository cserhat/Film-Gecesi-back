import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Formun bos olup olmadigini kontrol ediyoruz
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json("Lütfen tüm alanları doldurun");
  }

  // Veritabanında üye var mı diye kontrol et
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Bu kullanıcı zaten var");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Kayıt işlemi başarıyla gerçekleştirildi.");
    });
  });
};


export const login = (req, res) => {
  // Formun bos olup olmadigini kontrol ediyoruz
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Lütfen tüm alanları doldurun");
  }

  // Kullanici var mi yok mu kontrol ediyoruz
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("Kullanıcı bulunamadı");

    // Şifreyi kontrol ediyoruz
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Email veya şifreniz yanlış");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(other);
  });
};

  
  export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("Basariyla cikis yapildi.")
}