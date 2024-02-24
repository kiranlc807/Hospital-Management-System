import express from "express";
import { userAuth } from '../middlewares/auth.middleware';
import * as AppointmentController from "../controllers/appointment.controller";

const router = express.Router();

router.post('/:_id',userAuth,AppointmentController.createAppointment);

router.get('',userAuth,AppointmentController.getAllAppointments);

router.put('/doctor',AppointmentController.updateAppointmentStatus);

router.get('/doctor/:_id',AppointmentController.getAllAppointmentsBasedOnDoctor);


export default router;