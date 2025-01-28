const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

// MYSQL VEZA
const connection = mysql.createConnection({
  //Stvaranje veze s bazom fstefanac, te ispis njenih podataka
  host: "ucka.veleri.hr",
  user: "fstefanac",
  password: "11",
  database: "fstefanac",
});
// VEZA S BAZOM PODATAKA
connection.connect((err) => {
  //Uspostavljanje veze
  if (err) {
    console.error("Greška u povezivanju sa bazom:", err); //Ako se dogodi greška ispis greške
  } else {
    console.log("Povezano sa bazom podataka!"); //Ako je uspjesno povezana
  }
});

////ENDPOINTI ZA ADMINA:-------------------------------------------------------------------------------------------

// ENDPOINT POPIS KORISNIKA
app.get("/api/korisnici", (request, response) => {
  connection.query("SELECT * FROM Korisnik", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// ENDPOINT LogIn korisnika
app.get("/api/login", (req, res) => {
  const { ID_korisnika, Lozinka_korisnika } = req.query; // Correctly retrieve the query parameters
  console.log(
    "ID_korisnika:",
    ID_korisnika,
    "Lozinka_korisnika:",
    Lozinka_korisnika
  ); // Correct logging of parameters

  // SQL query to find the user in the database
  const query =
    "SELECT Ime_korisnika, Prezime_korisnika FROM Korisnik WHERE ID_korisnika = ? AND Lozinka_korisnika = ?";
  connection.query(query, [ID_korisnika, Lozinka_korisnika], (err, results) => {
    if (err) {
      console.error("Error querying database:", err); // Log any SQL errors
      return res.status(500).json({ error: "Greška pri prijavi korisnika" }); // Internal server error response
    }

    // If user is found in the database
    if (results.length > 0) {
      const korisnik = results[0]; // Get the first user from the result set
      res.json({
        success: true,
        message: `Uspješno ste logirani! Ime i prezime: ${korisnik.Ime_korisnika} ${korisnik.Prezime_korisnika}`, // Correctly access the user data
      });
    } else {
      res.status(404).json({ error: "Neispravan ID ili lozinka." }); // If no user is found
    }
  });
});
// ENDPOINT ZA DOHVAT KOMENTARA
app.get("/api/zahtjevi", (req, res) => {
  const zahtjev = req.query.adminId;
  const query = `SELECT * FROM ZahtjeviZaAdmina`;

  connection.query(query, [zahtjev], (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
// ENDPOINT ZA OBJAVU KOMENTARA

app.post("/api/zahtjev", (req, res) => {
  const { zahtjev } = req.body; // Destructure the comment from the request body

  if (!zahtjev || zahtjev.trim() === "") {
    return res.status(400).json({ error: "Zahtjev ne može biti prazan." }); // Validate input
  }

  const query = "INSERT INTO ZahtjeviZaAdmina (Zahtjev) VALUES (?)";
  connection.query(query, [zahtjev], (err, results) => {
    if (err) {
      console.error("Greška pri dodavanju zahtjeva:", err);
      res.status(500).json({ error: "Greška pri slanju poruke" });
    } else {
      res
        .status(200)
        .json({ insertId: results.insertId, message: "Poruka zabilježena" });
    }
  });
});

//ENDPOINT ZA BRISANJE KOMENTARA
app.delete("/api/zahtjev/:ID_Zahtjeva", (req, res) => {
  const ID_Zahtjeva = req.params.ID_Zahtjeva;

  const query = "DELETE FROM ZahtjeviZaAdmina WHERE ID_Zahtjeva = ?";
  connection.query(query, [ID_Zahtjeva], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja korisnika:", err);
      return res
        .status(500)
        .json({ error: "Greška prilikom brisanja korisnika" });
    }
    res.json({ message: "Zahtjev uspješno obrisan" });
  });
});

// ENDPOINT planovi
app.get("/api/planovi", (req, res) => {
  const { searchQuery, searchByCategory, searchByName } = req.query;

  let query = "SELECT * FROM Planovi WHERE 1=1"; // Osnovni upit
  const params = [];

  if (searchQuery) {
    if (searchByCategory === "true") {
      query += " AND vrstaBiljke LIKE ?";
      params.push(`%${searchQuery}%`); // Pretraga prema vrsti plana
    }
    if (searchByName === "true") {
      query += " AND nazivBiljke LIKE ?";
      params.push(`%${searchQuery}%`); // Pretraga prema nazivu plana
    }
  }

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Greška prilikom pretrage planova:", error);
      return res
        .status(500)
        .json({ error: "Greška prilikom pretrage planova" });
    }
    res.json(results); // Pošaljite rezultate
  });
});

// ENDPOINT POPIS NARUDŽBA
app.get("/api/narudzbe", (request, response) => {
  connection.query("SELECT * FROM Kosarica", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

// ENDPOINT LogIn admina
app.get("/Admin", (req, res) => {
  const adminId = req.query.adminId;
  const query = `SELECT EXISTS(SELECT * FROM Admin WHERE ID_admina = ?) AS id_exists;`;

  connection.query(query, [adminId], (err, results) => {
    if (err) {
      console.error("Error during query execution:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//ENDPOINT DODAJ KORISNIKA
app.post("/api/Korisnik", (req, res) => {
  const { ime, prezime, email, lozinka, adresa, telefon } = req.body;
  const query = `INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika,Lozinka_korisnika, Adresa_korisnika, Kontakt_korisnika) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [ime, prezime, email, lozinka, adresa, telefon],
    (err, results) => {
      if (err) {
        console.error("Greška pri dodavanju korisnika:", err);
        res.status(500).json({ error: "Greška pri dodavanju korisnika" });
      } else {
        res
          .status(200)
          .json({ id: results.insertId, message: "Korisnik uspješno dodan" });
      }
    }
  );
});

// API za brisanje korisnika
app.delete("/api/Korisnik/:ID_korisnika", (req, res) => {
  const ID_korisnika = req.params.ID_korisnika;

  const query = "DELETE FROM Korisnik WHERE ID_korisnika = ?";
  connection.query(query, [ID_korisnika], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja korisnika:", err);
      return res
        .status(500)
        .json({ error: "Greška prilikom brisanja korisnika" });
    }
    res.json({ message: "Korisnik uspješno obrisan" });
  });
});

// Backend API za dodavanje biljke
app.post("/api/Biljka", (req, res) => {
  const { naziv, vrsta, opis, kolicina, cijena } = req.body;
  const query = `INSERT INTO Planovi (nazivPlana, opisPlana, cijena) VALUES (?, ?, ?)`;

  connection.query(query, [naziv, opis, cijena], (err, results) => {
    if (err) {
      console.error("Greška prilikom dodavanja plana:", err);
      res.status(500).json({ error: "Greška prilikom dodavanja plana" });
    } else {
      // Ako je biljka uspješno dodana, vraćamo odgovor s podacima
      res
        .status(200)
        .json({
          id: results.insertId,
          message: "Plan prehrane uspješno dodana",
        });
    }
  });
});

// ENDPOINT - Brisanje biljke prema ID-u
app.delete("/api/planovi/:sifraPlana", (req, res) => {
  const { sifraBiljke } = req.params;
  const query = "DELETE FROM Planovi WHERE sifraPlana = ?";

  connection.query(query, [sifraBiljke], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja plana:", err);
      return res.status(500).json({ error: "Greška prilikom brisanja plana" });
    }
    res.json({ message: "Plan prehrane uspješno obrisana" });
  });
});

// ENDPOINT - dodavanje narudzbe

app.post("/api/dodavanjenarudzbe", (req, res) => {
  const { nazivPlana, ID_korisnika, sifraPlana } = req.body;

  // SQL upit za dodavanje narudžbe
  const query = `
    INSERT INTO Kosarica (nazivPlana, ID_korisnika, sifraPlana)
    VALUES (?, ?, ?)
  `;

  connection.query(
    query,
    [nazivPlana, ID_korisnika, sifraPlana],
    (err, results) => {
      if (err) {
        console.error("Greška prilikom dodavanja plana:", err);
        return res
          .status(500)
          .json({ error: "Greška prilikom dodavanja plana" });
      }

      res.status(201).json({
        message: "Plan prehrane uspješno dodan!",
        narudzbaId: results.insertId,
      });
    }
  );
});

// ENDPOINT - Brisanje narudžbe prema ID-u
app.delete("/api/brisanjenarudzbe/:ID_Kosarice", (req, res) => {
  const ID_Kosarice = req.params.ID_Kosarice; // Correctly reference the URL parameter
  const query = "DELETE FROM Kosarica WHERE ID_Kosarice = ?";

  connection.query(query, [ID_Kosarice], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja narudžbe:", err);
      return res.status(500).json({ error: "Greška prilikom brisanja plana" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Plan prehrane nije pronađen" });
    }
    res.json({ message: "Plan prehrane uspješno obrisan" });
  });
});

///KRAJ ADMINA--------------------------------------------------------------------------------------------------------------------------

app.use((err, req, res, next) => {
  //Greška u middleware funkciji
  console.error(err.stack);
  res.status(500).send("Greska u povezanosti!"); //Ispis poruke i greške
});

app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});
