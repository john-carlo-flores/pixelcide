const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, SALT } = process.env;
const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (id) => {
    return jwt.sign(
      { id }, 
      ACCESS_TOKEN_KEY,
      { expiresIn: "2h"}
      );
  },
  
  generateRefreshToken: (id) => {
    return jwt.sign(
      { id }, 
      REFRESH_TOKEN_KEY,
      );
  },
  
  verify: (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        return next();
      })
  
    }
    
    res.status(401).json("User failed authentication!");
  },

  validRefreshToken: (refreshToken, ) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, user) => {
      if (!err) {
        return user;
      } 

      console.log(err);
      return false;
    });
  }
};
