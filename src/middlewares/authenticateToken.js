import jwt from "jsonwebtoken";

export async function authenticateToken (req, res, next) {
    try {
        const userToken = req.headers.authorization; // Récupérer le "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV"
        const arrayToken = userToken.split(" "); // séparer le mot bearer du token
        const token = arrayToken[1]; // Garder uniquement le token
        if (!token) { 
            res.status(401).json({error : "Token absent"});
            return
        }
        
        // On utilise la clef secrete pour bien faire sa vérification avec la méthode Verify
        // La méthode vérify décode le token, recalcul la signature avec la clef secrète puis compare si la signature correspond
        const verifToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // On ajoute au gros objet Req une clef user avec l'objet verifToken
        // On pourra s'en servir dans les autres fonctions
        req.user = verifToken;
        next(); // Passe à la fonction d'après

    } catch (error) {
        console.log("❌ ERREUR:", error.message);
        res.status(403).json({error : "Token invalide ou expiré"});
        return
    }
}