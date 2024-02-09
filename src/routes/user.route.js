import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
const passport = require('passport');

const router = express.Router();

router.post('/signup',userController.newUser);

router.post('/login',userController.login);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home or send response as needed.
    res.redirect('http://localhost:3000/api/v1');
  });


export default router;
