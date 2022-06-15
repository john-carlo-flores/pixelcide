const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, SALT } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    // Check if user passed in access Token
    if (!authHeader) {
      return res.status(401).json("User failed authentication!");
    }

    // Parse for access token
    const token = authHeader.split(" ")[1];
    let verifyError = null;

    // Validate access token
    jwt.verify(token, ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        verifyError = err;
      }
      
      // Store token
      req.user = user;
    });
    
    // Exit if invalid token
    if (verifyError) {
      return res.status(403).json("Token is not valid!");
    }
    
    next();
  },

  validRefreshToken: (refreshToken, ) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err, user) => {
      if (!err) {
        return user;
      } 

      console.log(err);
      return false;
    });
  },

  verifyPassword: function(plainTextPassword, hash) {
    return bcrypt.compare(plainTextPassword, hash)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  },

  hashPassword: (plainTextPassword) => {
    return bcrypt.hash(plainTextPassword, parseInt(SALT))
      .then((hash) => {
        return hash;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  }
};
