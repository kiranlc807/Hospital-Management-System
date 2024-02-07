import express from "express";
import * as HospitalController from '../controllers/hospital.controller'

const router = express.Router();

// router.get('/',HospitalController.getAllHospitals)

router.post('/add',HospitalController.addHospital);

export default router;