import express from "express";
import { userAuth } from '../middlewares/auth.middleware';
import * as AppointmentController from "../controllers/appointment.controller";

const router = express.Router();

router.post('/:_id',userAuth,AppointmentController.createAppointment);

router.get('',userAuth,AppointmentController.getAllAppointments);

router.put('',userAuth,AppointmentController.updateAppointmentStatus);


export default router;