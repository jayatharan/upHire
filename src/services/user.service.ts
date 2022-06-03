import db from '../models';
import { UserDocument } from '../models/user.model';
import bcrypt from "bcrypt";
import { omit } from "lodash";

export interface CreateSession {
    email : string;
    password: string;
}

const User = db.User;

export async function createUser(input: UserDocument){
    try{
        const user = await User.create(input);
        return user;
    } catch(error){
        throw new Error("User create error");
    }
}

export async function validatePassword({
    email,
    password
}:CreateSession) {
    if(!password || !email) return false;
    const user = await getUserByEmail(email);
    if(!user) return false;
    const isValid = await comparePassword(user.password , password);
    console.log(password);
    if (!isValid) return false
    return omit(user.toJSON(), ["password"])
}

export async function comparePassword (password:string , check_password:string) {
    return await bcrypt.compare(check_password, password);
}

export async function getUserById(id:string) {
    return (await User.findByPk(id));
}

export async function getUserByEmail(email:string) {
    return (await User.findOne({ where: { email } }))
}

export async function updateUser(userId:string, input:UserDocument){
    try{
        const existingUser = await User.findByPk(userId);
        if(!existingUser) throw new Error("User update error");
        if(input.email) existingUser.email = input.email;
        if(input.name) existingUser.name = input.name
        if(input.role) existingUser.role = input.role
        if(input.password) existingUser.password = input.password
        if(input.alternativeEmail) existingUser.alternativeEmail = input.alternativeEmail
        if(input.mobileNumber) existingUser.mobileNumber = input.mobileNumber
        if(input.image) existingUser.image = input.image
        await existingUser.save();
        return existingUser;
    }catch (error) {
        throw new Error("User update error");
    }
}