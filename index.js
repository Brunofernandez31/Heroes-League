import express, { Router } from "express";
import { router } from './src/routers/index.router.js';

const PORT = process.env.PORT;

const app = express();

// Je rajoute à express la gestion des fichiers statiques
// Tous les fichiers dans le dossier "public" seront servis tels quels
app.use(express.static('public'));

app.set('view engine', 'ejs');
// On va également définir le dossier où se trouvent les templates EJS
app.set('views', './views');


app.get('/' , (req,res) => {
    res.render("index")
})

app.get('/sauvez-moi' , (req,res) => {
    res.render("sauvez-moi")
})

app.use(router);

app.listen(PORT, () => {
    console.log("Le serveur tourne sur le port 3000")
})