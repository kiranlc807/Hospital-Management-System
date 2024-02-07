import Hospital from "../models/hospital.model";
import User from "../models/user.model";

export const addHospital = async(body,userObj)=>{
    const user = await User.findOne({_id:userObj.userId,role:userObj.role});
    if(!user){
        throw new Error("Admin Not Found")
    }
    const hospital = await Hospital.findOne({name:body.name});
    if(hospital){
        throw new Error("Hospital Already Exist");
    }else{
        const newHospital = await Hospital.create(body);
        return newHospital;
    }
}

export const getAllHospital = async(userId)=>{
    const user = await User.findOne(userId);
    if(!user){
        throw new Error("user Not Found")
    }
    const hospitals = await Hospital.find();
    if(!hospitals){
        throw new Error("No Hospitals Found")
    }
    return hospitals;
}

export const addDepartment = async (hospitalId, departmentData, userObj) => {
    try {
        // Check if the user is authorized to add a department
        if(userObj.role=="patient"){
            throw new Error("Admin Not Found");
        }
        const user = await User.findOne({ _id: userObj.userId});
        if (!user) {
            throw new Error("Admin Not Found");
        }
        
        // Check if the hospital exists
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            throw new Error("Hospital Not Found");
        }
        const departments = hospital.departments;
        const res = departments.find((c)=>c.name===departmentData.name)
        if(res){
            throw new Error("Department Already Exist");
        }
        // Create a new department
        const newDepartment = {
            name: departmentData.name,
            description: departmentData.description
        };

        // Add the department to the hospital
        hospital.departments.push(newDepartment);

        // Save the updated hospital with the new department
        await hospital.save();

        return newDepartment;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getAllDepartments = async (hospitalId) => {
    try {
        // Check if the hospital exists
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            throw new Error("Hospital Not Found");
        }

        // Retrieve all departments of the hospital
        const departments = hospital.departments;

        return departments;
    } catch (error) {
        throw new Error(error.message);
    }
}

