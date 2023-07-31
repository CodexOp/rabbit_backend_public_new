const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = (req, res, next) => {
  try {

    // allow bypass for certain routes
    if (req.path.substring(0, 6) === '/game/' || 
    req.path.substring(0, 6) === '/user/' || 
    req.path.substring(0, 14) === '/totalUserBet/' || 
    req.path === '/currentGameId' ||
    req.path === '/gamestarttime' ||
    req.path === '/txnHistory' ||
    req.path === '/winnerList' ||
    req.path.substring(0, 10) === '/totalBet/' ||
    req.path.substring(0, 16) === '/totalPeopleBet/'
    ) {
      next();
      return;
    }

    const token = req.headers['authorization'];
    const details = jwt.verify(token, process.env.SECRET_KEY);
    req.body.user = details;
    next();
  } catch (err) {
    console.log(err.message);
    if (err.message === 'jwt expired') {
      return res.status(403).send({ error: 'Token expired' });
    }
    return res.status(403).send({ error: 'Invalid Token' });
  }
};

module.exports = verify;
