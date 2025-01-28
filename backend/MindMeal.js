<<<<<<< HEAD
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
=======
// Import required modules
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
>>>>>>> 627c934 (KRAJ)
  host: "ucka.veleri.hr",
  user: "fstefanac",
  password: "11",
  database: "fstefanac",
});
<<<<<<< HEAD
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
=======

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Endpoints

// 1. Get all users (Korisnik)
app.get("/api/korisnici", (req, res) => {
  const query = "SELECT * FROM Korisnik";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Error fetching users" });
    }
    res.json(results);
  });
});

// 2. Get all meal plans (Planovi)
app.get("/api/planovi", (req, res) => {
  const { searchQuery, searchByCategory, searchByName } = req.query;

  let query = "SELECT * FROM Planovi";
  let queryParams = [];

  if (searchQuery) {
    // Ako je searchQuery postavljen, dodaj uvjet za pretragu
    const conditions = [];
    if (searchByCategory === "true") {
      conditions.push("opisPlana LIKE ?");
      queryParams.push(`%${searchQuery}%`);
    }
    if (searchByName === "true") {
      conditions.push("nazivPlana LIKE ?");
      queryParams.push(`%${searchQuery}%`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" OR ");
    }
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching plans:", err);
      return res.status(500).json({ error: "Error fetching plans" });
    }
    res.json(results);
  });
});

// 3. Get a specific user by ID
app.get("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Korisnik WHERE ID_korisnika = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user" });
    }
    res.json(results[0]);
  });
});

// 4. Get a specific meal plan by ID
app.get("/api/planovi/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Planovi WHERE sifraPlana = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching plan:", err);
      return res.status(500).json({ error: "Error fetching plan" });
    }
    res.json(results[0]);
  });
});

// 5. Add a new user (Korisnik)
app.post("/api/Korisnik", (req, res) => {
  const {
    Ime_korisnika,
    Prezime_korisnika,
    Email_korisnika,
    Lozinka_korisnika,
    Adresa_korisnika,
    Kontakt_korisnika,
  } = req.body;
  const query = `INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika, Lozinka_korisnika, Adresa_korisnika, Kontakt_korisnika) VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      Ime_korisnika,
      Prezime_korisnika,
      Email_korisnika,
      Lozinka_korisnika,
      Adresa_korisnika,
      Kontakt_korisnika,
    ],
>>>>>>> 627c934 (KRAJ)
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

<<<<<<< HEAD
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
=======
// 6. Add a new meal plan (Planovi)
app.post("/api/planovi", (req, res) => {
  const { nazivPlana, opisPlana, cijena } = req.body;

  // Validate input
  if (!nazivPlana || !opisPlana || !cijena) {
    return res
      .status(400)
      .json({ error: "Naziv plana, opis i cijena su obavezni!" });
  }

  // Validate cijena as a number
  if (isNaN(cijena) || cijena <= 0) {
    return res.status(400).json({ error: "Cijena mora biti pozitivni broj!" });
  }

  const query =
    "INSERT INTO Planovi (nazivPlana, opisPlana, cijena) VALUES (?, ?, ?)";

  connection.query(query, [nazivPlana, opisPlana, cijena], (err, results) => {
    if (err) {
      console.error("Error adding plan:", err);
      return res.status(500).json({ error: "Error adding plan" });
    }
    res
      .status(201)
      .json({ message: "Plan added successfully", id: results.insertId });
  });
});

// 7. Delete a user by ID
app.delete("/api/korisnici/:id", (req, res) => {
  const { id } = req.params;

  console.log("Primljen zahtev za brisanje korisnika sa ID:", id); // Dodajte ovaj log

  const query = "DELETE FROM Korisnik WHERE ID_korisnika = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Greška prilikom brisanja korisnika:", err);
      return res.status(500).json({ error: "Greška prilikom brisanja korisnika" });
    }
    if (results.affectedRows === 0) {
      console.log("Korisnik sa datim ID nije pronađen:", id); // Dodajte ovaj log
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    console.log("Korisnik uspešno obrisan:", id); // Dodajte ovaj log
    res.json({ message: "Korisnik uspešno obrisan" });
  });
});

// 8. Delete a meal plan by ID
app.delete("/api/planovi/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM Planovi WHERE sifraPlana = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting plan:", err);
      return res.status(500).json({ error: "Error deleting plan" });
    }
    res.json({ message: "Plan deleted successfully" });
  });
});

// 9. Login user (LogIn korisnika)
app.get("/api/login", (req, res) => {
  const { ID_korisnika, Lozinka_korisnika } = req.query;

  const query =
    "SELECT Ime_korisnika, Prezime_korisnika FROM Korisnik WHERE ID_korisnika = ? AND Lozinka_korisnika = ?";
  connection.query(query, [ID_korisnika, Lozinka_korisnika], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Greška pri prijavi korisnika" });
    }

    if (results.length > 0) {
      const korisnik = results[0];
      res.json({
        success: true,
        message: `Uspješno ste logirani! Ime i prezime: ${korisnik.Ime_korisnika} ${korisnik.Prezime_korisnika}`,
      });
    } else {
      res.status(404).json({ error: "Neispravan ID ili lozinka." });
    }
>>>>>>> 627c934 (KRAJ)
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

<<<<<<< HEAD
///KRAJ ADMINA--------------------------------------------------------------------------------------------------------------------------

app.use((err, req, res, next) => {
  //Greška u middleware funkciji
  console.error(err.stack);
  res.status(500).send("Greska u povezanosti!"); //Ispis poruke i greške
});

app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});
=======
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/narudzbe", (request, response) => {
  connection.query("SELECT * FROM Kosarica", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});


>>>>>>> 627c934 (KRAJ)
