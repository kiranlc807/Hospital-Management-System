import HttpStatus from "http-status-codes";
import * as DoctorService from '../services/doctor.service';

// Controller function to create a new doctor
export const createDoctor = async (req, res) => {
    try {
        const { name, departmentName, availability,qualifications } = req.body;
        const hospitalId = req.params._id;
        const userObj = req.user; // Assuming user information is attached to the request object

        // Call the doctor service to create the new doctor
        const newDoctor = await DoctorService.createDoctor(name, hospitalId, departmentName, availability,qualifications, userObj);

        // Send the newly created doctor as response
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:newDoctor,
            message:"Added Successfully"
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message: error.message
        })
    }
};

// Controller function to get all doctors by department ID
export const getAllDoctorsByDepartmentId = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const userId = req.user.userId; // Assuming user information is attached to the request object

        // Call the doctor service to get all doctors by department ID
        const doctors = await DoctorService.getAllDoctorsByDepartmentId(hospitalId, userId);

        // Send the list of doctors as response
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:doctors,
            message:"Retrived Successfully"
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message: error.message
        })
    }
};
