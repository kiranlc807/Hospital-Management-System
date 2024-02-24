import * as AppointmentService from "../services/appointment.service"
import HttpStatus from "http-status-codes";


export const createAppointment = async (req, res) => {
    try {
        const newAppointment = await AppointmentService.createAppointment(req.user.userId, req.params._id,req.body.date);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:newAppointment,
            message:"Applied Succussfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.OK,
            message:error.message
        });
    }
};


export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments(req.user.userId);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:appointments,
            message:"Retrived Succussfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.OK,
            message:error.message
        });
    }
};


export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const updatedAppointment = await AppointmentService.updateAppointmentStatus(appointmentId, status,req.user);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:updatedAppointment,
            message:"Updated Succussfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:error.message
        });
    }
};

export const getAllAppointmentsBasedOnDoctor = async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointmentsBasedOnDoctor(req.params._id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:appointments,
            message:"Retrived Succussfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.OK,
            message:error.message
        });
    }
};
