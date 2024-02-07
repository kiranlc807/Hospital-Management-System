import Hospital from '../models/hospital.model';
import Doctor from '../models/doctor.model';
import User from '../models/user.model';
const mongoose = require('mongoose');

export const createDoctor = async (name, hospitalId, departmentName, availability,qualifications, userObj) => {
    try {
        // Check if the user is authenticated
        if (!userObj || !userObj.userId || !userObj.role) {
            throw new Error("Unauthorized: User not authenticated");
        }

        // Check if the user is authorized to create a doctor (e.g., an admin or staff)
        const user = await User.findOne({ _id: userObj.userId, role: userObj.role });
        if (!user) {
            throw new Error("Unauthorized: User not authorized to create a doctor");
        }

        // Find the hospital by hospitalId
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            throw new Error('Hospital not found');
        }

        // Find the department within the hospital's departments array
        const department = hospital.departments.find(dep =>
            dep.name.toLowerCase().trim() === departmentName.toLowerCase().trim()
        );
        if (!department) {
            throw new Error('Department not found in the hospital');
        }

        const doctor = await Doctor.findOne({name:name});
        if(doctor){
            throw new Error("Doctor Already Exists");
        }
        // Create a new doctor instance with the provided data
        const newDoctor = new Doctor({
            name: name,
            hospital: hospitalId,
            department: department._id, // Use the department's _id
            availability: availability,
            qualifications:qualifications
        });

        // Save the new doctor to the database
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
        // Find all doctors with the specified departmentId
        const doctors = await Doctor.find({ hospitalId: hospitalId });

        return doctors;
    } catch (error) {
        throw new Error(error.message);
    }
};


