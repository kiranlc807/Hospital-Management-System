import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import hospitalRoute from './hospital.route';


const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/hospital',hospitalRoute);
  return router;
};

export default routes;
