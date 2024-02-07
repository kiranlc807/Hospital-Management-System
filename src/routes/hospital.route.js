import express from "express";
import * as HospitalController from '../controllers/hospital.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/',userAuth,HospitalController.getAllHospital);

router.post('/add',userAuth,HospitalController.addHospital);

router.get('/:_id/department',userAuth,HospitalController.getAllDepartments);

router.post('/:_id/department',userAuth,HospitalController.addDepartment);


export default router;