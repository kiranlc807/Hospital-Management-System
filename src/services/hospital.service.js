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
        throw new Error("Admin Not Found")
    }
    const hospitals = await Hospital.find();
    if(!hospitals){
        throw new Error("No Hospitals Found")
    }
    return hospitals;
}