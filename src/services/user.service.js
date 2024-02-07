import User from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const newUser = async(user)=>{
  const userData = await User.findOne({email:user.email});
  if(userData){
    throw new Error("User Alredy Exist");
  }
  else{
    const saltRound = 10;
    user.password = await bcrypt.hash(user.password,saltRound);
    const newUser = await User.create(user);
    return newUser;
  }
}

export const login = async(body)=>{
  const user = await User.findOne({email:body.email});
  console.log(user);
  if(!user){
    throw new Error("User Not Exist")
  }
  const res = await bcrypt.compare(body.password,user.password);
  console.log("Service",res);
  if(!res){
    throw new Error("Incorrect Password");
  }else{
    return jwt.sign({userId:user._id},process.env.SECRET_KEY)
  }
}