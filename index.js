const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL kullanıcı adınızı buraya yazın
  password: '12345678', // MySQL şifrenizi buraya yazın
  database: 'SinemaKararSistemi'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err);
  } else {
    console.log('MySQL\'e başarıyla bağlandı!');
  }
});



// Dinleme Portu
const PORT = process.env.PORT || 3001; // Varsayılan port: 3001
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});




app.get('/kar-zarar/:sinema_id', (req, res) => {
  const sinema_id = req.params.sinema_id;
  db.query(
    `SELECT ay, 
            SUM(tutar) AS toplamGelir 
     FROM Gelir 
     WHERE sinema_id = ? 
     AND ay IN (6, 7, 8, 9, 10, 11, 12)
     GROUP BY ay 
     ORDER BY ay`,
    [sinema_id],
    (err, results) => {
      if (err) {
        console.error('Veritabanı Hatası:', err);
        res.status(500).send('Sunucu Hatası');
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/sinemalar-gelirleri/:sinema_id', (req, res) => {
  const sinema_id = req.params.sinema_id;

  if (!sinema_id || isNaN(sinema_id)) {
      res.status(400).json({ error: 'Geçersiz sinema ID' });
      return;
  }

  const query = `
      SELECT ay, SUM(tutar) AS gelir
      FROM Gelir
      WHERE sinema_id = ?
      AND ay IN (6, 7, 8, 9, 10, 11, 12)
      GROUP BY ay
      ORDER BY ay;
  `;

  db.query(query, [sinema_id], (err, results) => {
      if (err) {
          console.error('Veritabanı hatası:', err);
          res.status(500).json({ error: 'Sunucu hatası', details: err.message });
      } else {
          // Döngü ile array'e dönüştürme
          const formattedResults = [];
          for (const row of results) {
              formattedResults.push({
                  ay: row.ay,
                  gelir: row.gelir
              });
          }

          // Yanıtı gönder
          res.json(formattedResults);
      }
  });
});










app.get('/personeller/:sinema_id', (req, res) => {
  const sinema_id = req.params.sinema_id;

  if (!sinema_id || isNaN(sinema_id)) {
      res.status(400).json({ error: 'Geçersiz şube ID' });
      return;
  }

  const query = `
      SELECT ad_soyad
      FROM Personel
      WHERE sinema_id = ?;
  `;

  db.query(query, [sinema_id], (err, results) => {
      if (err) {
          console.error('Veritabanı hatası:', err);
          res.status(500).json({ error: 'Sunucu hatası', details: err.message });
      } else if (!Array.isArray(results)) {
          res.status(500).json({ error: 'Beklenmeyen yanıt formatı' });
      } else {
          const formattedResults = results.map(row => ({ ad_soyad: row.ad_soyad }));
          res.json(formattedResults);
      }
  });
});










app.get('/sinemalar-giderleri/:sinemaID', (req, res) => {
  const sinemaID = req.params.sinemaID;

  if (!sinemaID || isNaN(Number(sinemaID))) {
      res.status(400).json({ error: 'Geçersiz şube ID' });
      return;
  }

  const query = `
      SELECT ay, SUM(tutar) AS gider
      FROM Gider
      WHERE sinema_id = ?
      AND ay IN (6, 7, 8, 9, 10, 11, 12)
      GROUP BY ay
      ORDER BY ay;
  `;

  db.query(query, [sinemaID], (err, results) => {
      if (err) {
          console.error('Veritabanı hatası:', err);
          res.status(500).json({ error: 'Sunucu hatası', details: err.message });
      } else if (!results.length) {
          res.status(404).json({ error: 'Şube için gider bulunamadı' });
      } else {
          res.json(results);
      }
  });
});

















// Sinemaları Getir
app.get('/sinemalar', (req, res) => {
  const query = 'SELECT * FROM Sinema';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Veritabanı hatası');
    } else {
      res.json(results);
    }
  });
});

// Gelirleri Getir
app.get('/gelirler', (req, res) => {
  const query = 'SELECT * FROM Gelir';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Veritabanı hatası');
    } else {
      res.json(results);
    }
  });
});

// Giderleri Getir
app.get('/giderler', (req, res) => {
  const query = 'SELECT * FROM Gider';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Veritabanı hatası');
    } else {
      res.json(results);
    }
  });
});


// Statik Dosyaları Sunma
app.use(express.static('public'));

// Varsayılan Rotayı Belirleme
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/kar-zarar/:sinema_id', (req, res) => {
  console.log('Kar-Zarar Route Çalışıyor');
  res.send('Kar-Zarar Verileri');
});



app.get('/personeller', (req, res) => {
  const query = `
      SELECT p.personel_id, p.ad_soyad, s.sinema_adi
      FROM personel p
      JOIN Sinema s ON p.sinema_id = s.sinema_id
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results);
      }
  });
});

app.post('/personel/ekle', (req, res) => {
  const { ad_soyad, sinema_id } = req.body;
  const query = 'INSERT INTO Personel (ad_soyad, sinema_id) VALUES (?, ?)';
  db.query(query, [ad_soyad, sinema_id], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.send('Yeni personel başarıyla eklendi');
      }
  });
});

// Personel Sayısını Getir
app.get('/personel/sayisi', (req, res) => {
  const query = 'SELECT COUNT(*) AS personel_sayisi FROM personel';
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results[0]);
      }
  });
});

// Sinema Sayısını Getir
app.get('/sinema/sayisi', (req, res) => {
  const query = 'SELECT COUNT(*) AS sinema_sayisi FROM Sinema';
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results[0]);
      }
  });
});

// En Çok Gelir Elde Eden Şube
app.get('/en-cok-gelir-sube', (req, res) => {
  const query = `
      SELECT s.sinema_adi, SUM(g.tutar) AS toplam_gelir
      FROM Sinema s
      JOIN Gelir g ON s.sinema_id = g.sinema_id
      GROUP BY s.sinema_adi
      ORDER BY toplam_gelir DESC
      LIMIT 1
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results[0]);
      }
  });
});

// En Az Gelir Elde Eden Şube
app.get('/en-az-gelir-sube', (req, res) => {
  const query = `
      SELECT s.sinema_adi, SUM(g.tutar) AS toplam_gelir
      FROM Sinema s
      JOIN Gelir g ON s.sinema_id = g.sinema_id
      GROUP BY s.sinema_adi
      ORDER BY toplam_gelir ASC
      LIMIT 1
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results[0]);
      }
  });
});


// Şubelerin Kar-Zarar Durumu
app.get('/kar-zarar-durumu', (req, res) => {
  const query = `
      SELECT s.sinema_adi, 
             SUM(IFNULL(gelir.tutar, 0)) AS toplam_gelir,
             SUM(IFNULL(gider.tutar, 0)) AS toplam_gider,
             (SUM(IFNULL(gelir.tutar, 0)) - SUM(IFNULL(gider.tutar, 0))) AS kar_zarar
      FROM Sinema s
      LEFT JOIN Gelir gelir ON s.sinema_id = gelir.sinema_id
      LEFT JOIN Gider gider ON s.sinema_id = gider.sinema_id
      GROUP BY s.sinema_adi
      ORDER BY s.sinema_adi;
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results);
      }
  });
});


// Şubelerin Toplam Gelirleri
app.get('/gelirler-pie', (req, res) => {
  const query = `
      SELECT s.sinema_adi, SUM(IFNULL(g.tutar, 0)) AS toplam_gelir
      FROM Sinema s
      LEFT JOIN Gelir g ON s.sinema_id = g.sinema_id
      GROUP BY s.sinema_adi
      ORDER BY s.sinema_adi;
  `;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results);
      }
  });
});

app.get('/notlar', (req, res) => {
  const query = 'SELECT * FROM Notlar ORDER BY tarih DESC';
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.json(results);
      }
  });
});



app.get('/gelirler/optimum', (req, res) => {
  const sql = `
      SELECT ay, SUM(tutar) AS toplamGelir 
      FROM Gelir 
      WHERE sinema_id = 7 
      GROUP BY ay 
      ORDER BY ay
  `;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Gelir API Hatası:', err.message);
          res.status(500).send('Sunucu Hatası');
          return;
      }

      res.json(results); // Sorgu sonuçlarını döndür
  });
});






app.post('/notlar', (req, res) => {
  const { icerik } = req.body;
  const query = 'INSERT INTO Notlar (icerik) VALUES (?)';
  db.query(query, [icerik], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.send('Not başarıyla eklendi');
      }
  });
});



app.delete('/notlar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Notlar WHERE not_id = ?';
  db.query(query, [id], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.send('Not başarıyla silindi');
      }
  });
});



app.put('/notlar/:id', (req, res) => {
  const { id } = req.params;
  const { icerik } = req.body;
  const query = 'UPDATE Notlar SET icerik = ? WHERE not_id = ?';
  db.query(query, [icerik, id], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Veritabanı hatası');
      } else {
          res.send('Not başarıyla güncellendi');
      }
  });
});

app.get('/kar-zarar/:sinema_id', (req, res) => {
  const sinema_id = req.params.sinema_id;
  db.query(
      `SELECT ay, SUM(tutar) AS toplamGelir FROM Gelir WHERE sinema_id = ? GROUP BY ay ORDER BY ay`,
      [sinema_id],
      (err, results) => {
          if (err) {
              console.error('Database Error:', err);
              res.status(500).send('Sunucu Hatası');
          } else {
              res.json(results);
          }
      }
  );
});



app.get('/sinemalar-gelirleri/:sinema_id', (req, res) => {
  const sinema_id = req.params.sinema_id;

  if (!sinema_id || isNaN(sinema_id)) {
      res.status(400).json({ error: 'Geçersiz sinema ID' });
      return;
  }

  const query = `
      SELECT ay, SUM(tutar) AS gelir
      FROM Gelir
      WHERE sinema_id = ?
      AND ay IN (6, 7, 8, 9, 10, 11, 12)
      GROUP BY ay
      ORDER BY ay;
  `;

  db.query(query, [sinema_id], (err, results) => {
      if (err) {
          console.error('Veritabanı hatası:', err);
          res.status(500).json({ error: 'Sunucu hatası', details: err.message });
      } else {
          res.json(Array.isArray(results) ? results : []);
      }
  });
});


app.get('/personeller/:sinemaID', (req, res) => {
  const sinemaID = req.params.sinemaID;

  const query = `
      SELECT ad_soyad
      FROM Personel
      WHERE sinema_id = ?;
  `;

  db.query(query, [sinemaID], (err, results) => {
      if (err) {
          console.error('Veritabanı hatası:', err);
          res.status(500).json({ error: 'Sunucu hatası' });
      } else {
          res.json(results || []);
      }
  });
});

