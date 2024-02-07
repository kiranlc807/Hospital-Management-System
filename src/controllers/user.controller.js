import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const newUser = async(req,res)=>{
  try{
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code:HttpStatus.CREATED,
      data:data,
      message:"User Created Successfully"
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:error.message
    })
  }
}

export const login = async(req,res)=>{
  try{
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code:HttpStatus.OK,
      token:data,
      message:"Logged in Successfully"
    })
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:error.message
    })
  }
}