const User = require('../model/userModal');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body,'srytdhfgicame')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      message: 'User signed up successfully',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, )
    const refreshToken = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, )

     user.refreshToken = refreshToken;
     console.log(accessToken,'accesstoken')
     console.log(refreshToken,'refreshtoke')
    await user.save();
    res.cookie('refreshToken', refreshToken, {  secure: process.env.NODE_ENV === 'production', sameSite: 'strict'})
  
    res.cookie('accesstoken', accessToken,{secure:process.env.NODE_ENV==='production' })
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, username: user.username, email: user.email },
      accessToken,
    });
    // res.clearCookie('accessToken');
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
      }

      const user = await User.findById(decoded.user_id);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Invalid or mismatched refresh token' });
      }

    
      const accessToken = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY,) //{ expiresIn: '15m' });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
          });
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(500).json({ message: "Error refreshing token", error: error.message });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(user._id, "Logged-in User ID");

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error("Error fetching logged-in user details:", error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};

exports.getAllUser = async(req,res)=>{
  try {
      const currentUserId   = req.user._id

      const users = await User.find()
      const filteredUsers = users.filter((user) =>
        user._id.toString() !== currentUserId.toString()
      );
      res.json(filteredUsers)
  } catch (error) {
      res.status(500).send("server error")
  }
}


// exports.logout = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.refreshToken = null; 
//       await user.save();
//     }

//     res.clearCookie('refreshToken');
//     res.status(200).json({ message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error during logout', error: error.message });
//   }
// };

exports.logout = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
    console.log(req.user);
    
    if (user) {
 
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {

    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
};

