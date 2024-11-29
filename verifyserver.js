const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const jwt = require('jsonwebtoken');
const secretKey = 'plinplinplon';

//const app = express();
// Create a client ID for your project
const client = new OAuth2Client();

// Verify token middleware
async function verifyToken(req, res, next) {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorizationHeader.replace('Bearer ', '');
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "122339835194-s0hh7a071dhjsp81hkjs0k3321n81khk.apps.googleusercontent.com",
    });
    const userData = ticket.getPayload();
    req.user = userData;
    console.log(userData);
    //Revisar en los datos de la base de datos si el token es valido (Revisar el correo)

    //Gener el JWT token usando los datos del nombre
    const jwtToken = jwt.sign({ username: userData.name },
      secretKey, {
        expiresIn: '1h',
      });
      //Guarda el JWT en el objeto res.locals
      res.locals.jwtToken = jwtToken;
      //console.log("Tu token es: ", res.locals.jwtToken);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid token');
  }
}

// Protected route
router.get('/', verifyToken, (req, res) => {
  res.send(`Tu token es: ${res.locals.jwtToken}!`);
});

//const port = 5000;
//app.listen(port, () => {
//  console.log(`Server listening on port ${port}`);
//});

module.exports = router;