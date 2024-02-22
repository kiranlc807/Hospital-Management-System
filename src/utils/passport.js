import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

passport.use(new GoogleStrategy({
    clientID: "443758780630-2uvr16ldkaha5bh3drujh3jdnb25ml2i.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/v1/users/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const profileData = profile._json;
      let user = await User.findOne({ email: profile.emails[0].value });
      if(!user){
        const newUser = await User.create({name:profileData.name,email:profileData.email,password:profileData.sub,role:"patient"});
        const token = jwt.sign({ userId: newUser._id, role:newUser.role }, process.env.SECRET_KEY);
        return cb(null, { token });
      }else{
        const token = jwt.sign({ userId: user._id, role:user.role }, process.env.SECRET_KEY);
        return cb(null, { token });  
      }
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