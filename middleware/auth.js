const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from the header
  const token = req.header('x-auth-token');

  // check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: 'Token is not valid.' });
  }
};
