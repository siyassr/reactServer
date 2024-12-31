const jwt = require('jsonwebtoken');
const User = require('../model/userModal');

exports.authenticate = async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie;
    
    function getToken(cookieHeader, tokenName) {
      const tokenPattern = new RegExp(`${tokenName}=([^;]+)`);
      const match = cookieHeader ? cookieHeader.match(tokenPattern) : null;
      return match ? match[1] : null;
    }

    const accessToken = getToken(cookieHeader, 'accesstoken');
    const refreshToken = getToken(cookieHeader, 'refreshToken');

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token missing' });
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);

    if (!decoded || !decoded.user_id) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    
    next(); 
  } catch (error) {
    console.error('Authentication error:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    res.status(403).json({ message: 'Authentication failed', error: error.message });
  }
};
