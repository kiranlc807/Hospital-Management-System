import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: "443758780630-2uvr16ldkaha5bh3drujh3jdnb25ml2i.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/v1/users/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      console.log(profile);
      // Generate JWT token
      const token = jwt.sign({ userId: profile.id, role:"patient" }, process.env.SECRET_KEY);
        console.log(token);
      return cb(null, { token });
    } catch (err) {
      return cb(err);
    }
  }
));

// Serialize/deserialize user functions
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

export default passport;