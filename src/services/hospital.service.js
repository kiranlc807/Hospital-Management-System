import Hospital from "../models/hospital.model";

export const addHospital = async(body)=>{
    const hospital = await Hospital.findOne({name:body.name});
    if(hospital){
        throw new Error("Hospital Already Exist");
    }else{
        const newHospital = await Hospital.create(body);
        return newHospital;
    }
}