import express from "express";

const app = express();

app.set('view engine', 'ejs');
// On va également définir le dossier où se trouvent les templates EJS
app.set('views', './views');


app.get('/' , (req,res) => {
    res.render("index")
})

app.listen(3000, () => {
    console.log("Le serveur tourne sur le port 3000")
})