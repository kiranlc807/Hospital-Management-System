import express from "express";
import { userAuth } from '../middlewares/auth.middleware';
import * as DoctorController from '../controllers/doctor.controller';

const router = express.Router();

router.post('/:_id',userAuth,DoctorController.createDoctor);

router.get('/:_id',userAuth,DoctorController.getAllDoctorsByDepartmentId);

export default router;