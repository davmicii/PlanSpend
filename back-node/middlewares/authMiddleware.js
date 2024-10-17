const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // El token es válido, puedes guardar información del usuario en req.user
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token no válido' });
  }
};

module.exports = authenticateToken;
