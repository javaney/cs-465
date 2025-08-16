const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  async (username, password, done) => {
    try {
      const q = await User.findOne({ email: username }).exec();
      if (!q || !q.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, q);
    } catch (err) {
      return done(err);
    }
  }
));
