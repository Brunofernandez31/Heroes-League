export function isAdmin (req, res, next) {
    // Récupérer le role dans le req.user
    const role = req.user.role;

    if ( role !== 'admin' ) {
        return res.status(403).json({error : "Accès refusé. Réservé aux administrateurs."});
    };

    next();
}