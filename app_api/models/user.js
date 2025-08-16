const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  hash: String,
  salt: String
});

// Set password method
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Validate password method
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

// Generate JWT method
userSchema.methods.generateJWT = function() {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Compile the schema into a model, avoiding overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
