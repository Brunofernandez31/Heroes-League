export function isHero (req, res, next) {
    // Récupérer le role dans le req.user
    const role = req.user.role;

    if ( role !== 'hero' ) {
        return res.status(403).json({error : "Accès refusé. Réservé aux héros."});
    };

    next();
}