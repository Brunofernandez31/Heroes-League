import express from "express";

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

app.get('/services' , (req,res) => {
    res.render("services")
})

app.get('/nos-heros' , (req,res) => {
    res.render("nos-heros")
})

app.get('/temoignages' , (req,res) => {
    res.render("temoignages")
})

app.get('/sauvez-moi' , (req,res) => {
    res.render("sauvez-moi")
})

app.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000")
})