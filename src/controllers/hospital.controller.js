import HttpStatus from "http-status-codes";
import * as HospitalService from '../services/hospital.service';

export const addHospital = async(req,res)=>{
    try{
        const data = await HospitalService.addHospital(req.body,req.user);
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

export const getAllHospital = async(req,res)=>{
    try{
        const data = await HospitalService.getAllHospital(req.user.userID);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Retrived Successfully"
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:error.message
        })
    }
}

export const addDepartment = async(req,res)=>{
    try{
        const data = await HospitalService.addDepartment(req.params._id,req.body,req.user);
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.OK,
            data:data,
            message:"Added Successfully"
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:error.message
        })
    }
}

export const getAllDepartments = async(req,res)=>{
    try{
        const data = await HospitalService.getAllDepartments(req.params._id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:"Retrived Successfully"
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:error.message
        })
    }
}