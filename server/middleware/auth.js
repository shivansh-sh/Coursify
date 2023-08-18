const jwt = require('jsonwebtoken');
const secret = 'Shiva9S7';

const authenticateJwt = (req, res, next) =>{
    // this .authorization is a header like inthe postman
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secret, (err, user) =>{
        if(err){
          return res.status(403);
        }
        req.user = user; // add req user object into user 
        next();
      })
    }else{
      res.status(401);
    }
  }

  module.exports = {
    authenticateJwt,
    secret
  };
