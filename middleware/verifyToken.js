import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Aucun token trouvé." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré." });
    }

    req.user = decoded;
    next();
  });
}
