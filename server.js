import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Nécessaire pour pouvoir utiliser __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Sert tous les fichiers statiques dans le dossier courant (html, js, css...)
app.use(express.static(__dirname));

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
