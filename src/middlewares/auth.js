const jwt = require('jsonwebtoken');

async function autenticate(request, response, next) {
  const token = request.headers['x-access-token'];

  if (!token) return response.status(403).json({ error: 'Nenhum token enviado' });

  try {
    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    return next();
  } catch (error) {
    return response.status(401).json({ error });
  }
}

module.exports = autenticate;
