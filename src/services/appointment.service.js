import { log } from "winston";
import Appointment from "../models/appointment.model";
import User from "../models/user.model";
const mongoose = require('mongoose');

export const createAppointment = async (patientId, doctorId, date) => {
    try {
        console.log(patientId);
        const user = await User.findOne({_id:patientId});
        console.log(user);
        if(!user){
            throw new Error('user not found')
        }
        const appointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date: date
        });

        const savedAppointment = await appointment.save();

        return savedAppointment;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllAppointments = async (userId) => {
    try {
        const user = await User.findOne({_id:userId});
        if(!user){
            throw new Error('user not found')
        }
        console.log(userId);
        const appointments = await Appointment.find({patient:userId})
            .populate('patient') 
            .populate('doctor');
        return appointments;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const updateAppointmentStatus = async (appointmentId, status,userObj) => {
    try {
        // if(userObj.role=="patient"){
        //     throw new Error("Admin Not Found");
        // }
        // const user = await User.findOne({ _id: userObj.userId});
        // if (!user) {
        //     throw new Error("Admin Not Found");
        // }
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: status },
            { new: true }
        );

        if (!updatedAppointment) {
            throw new Error('Appointment not found');
        }

        return updatedAppointment;
    } catch (error) {
        throw new Error(error.message);
    }
};

// getAllAppointmentsBasedOnDoctor

// export const getAllAppointmentsBasedOnDoctor = async (userObj,doctorId) => {
//     try {
//         if(userObj.role=="patient"){
//             throw new Error("Admin Not Found");
//         }
//         const user = await User.findOne({ _id: userObj.userId});
//         if (!user) {
//             throw new Error("Admin Not Found");
//         }
//         const appointments = await Appointment.aggregate([
//             {
//                 $group: {
//                     _id: '$doctor',
//                     count: { $sum: 1 },
//                     appointments: {
//                         $push: {
//                             _id: '$_id',
//                             patient: '$patient',
//                             date: '$date',
//                             status: '$status'
//                             // Add more fields if needed
//                         }
//                     }
//                 }
//             },
//         ]);
//         return appointments;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

export const getAllAppointmentsBasedOnDoctor = async (doctorId) => {
    try {
        const appointments = await Appointment.find({doctor:doctorId});
        return appointments;
    } catch (error) {
        throw new Error(error.message);
    }
};
