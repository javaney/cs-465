const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({"message": "All fields required"});
  }
  
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    
    const q = await user.save();
    const token = q.generateJWT();
    res.status(200).json({token});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      "message": "Error creating user",
      "error": err.message
    });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({"message": "All fields required"});
  }
  
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJWT();
      res.status(200).json({token});
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = { register, login };
