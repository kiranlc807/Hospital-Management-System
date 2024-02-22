import Hospital from '../models/hospital.model';
import Doctor from '../models/doctor.model';
import User from '../models/user.model';
const mongoose = require('mongoose');

export const createDoctor = async (name, hospitalId, departmentId, availability,qualifications, userObj) => {
    try {
        
        if (!userObj || !userObj.userId || !userObj.role) {
            throw new Error("Unauthorized: User not authenticated");
        }

        const user = await User.findOne({ _id: userObj.userId, role: userObj.role });
        if (!user) {
            throw new Error("Unauthorized: User not authorized to create a doctor");
        }

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            throw new Error('Hospital not found');
        }
      
        const newDoctor = new Doctor({
            name: name,
            hospital: hospitalId,
            department: departmentId,
            availability: availability,
            qualifications:qualifications
        });

        const savedDoctor = await newDoctor.save();
        return savedDoctor;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllDoctorsByDepartmentId = async (hospitalId,userId) => {
    try {
        const user = await User.findOne({_id:userId})
        if(!user){
            throw new Error("User Not Found");
        }
 
        const doctors = await Doctor.find({ hospital: hospitalId });
        return doctors;
    } catch (error) {
        throw new Error(error.message);
    }
};


