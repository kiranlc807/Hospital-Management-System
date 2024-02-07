import User from "../models/user.model";
import bcrypt from 'bcrypt';

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