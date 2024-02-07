import HttpStatus from "http-status-codes";
import * as HospitalService from '../services/hospital.service';

export const addHospital = async(req,res)=>{
    try{
        const data = await HospitalService.addHospital(req.body);
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:data,
            message:"Added Successfully"
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message: error.message
        })
    }
}