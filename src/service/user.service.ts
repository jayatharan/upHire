import mongoose, { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
import { sendUserVerificationMail } from "./email.service"
import { EmailVerificationBody, UserDetailsUpdateBody } from "../controller/user.controller";

export async function createUser(input: Omit<DocumentDefinition<UserDocument>, "comparePassword">) {
    try{
        const user = await User.create(input);
        await sendUserVerificationMail(user.email, user.emailVerificationGuid!);
        return user;
    } catch (error) {
        throw new Error("User create error");
    }
}

export async function updateUser(user:UserDocument, input:UserDetailsUpdateBody){
    try{
        const existingUser = await User.findById(user._id);
        if(!existingUser) throw new Error("User update error");
        if(input.email){
            existingUser.email = input.email;
        }
        if(input.name) existingUser.name = input.name
        if(input.role) existingUser.role = input.role
        if(input.password) existingUser.password = input.password
        if(input.alternativeEmail) existingUser.alternativeEmail = input.alternativeEmail
        if(input.mobileNumber) existingUser.mobileNumber = input.mobileNumber
        if(input.image) existingUser.image = input.image
        await existingUser.save();
        const newUser = await User.findById(user._id);
        if(!newUser) throw new Error("User update error");
        return newUser;
    }catch (error) {
        throw new Error("User update error");
    }
}

export async function validatePassword({
    email,
    password
}: {
    email: UserDocument["email"];
    password:string;
}) {
    const user = await User.findOne({email});

    if(!user) return false;

    const isValid = await user.comparePassword(password);

    if (!isValid) return false

    return omit(user.toJSON(), ["password", "comparePassword"])
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function verifyEmail(data: EmailVerificationBody) {
    let user = await User.findOne({email:data.email})
    if(user){
        if(user.emailVerificationGuid?.toString() === data.guid) {
            user.emailVerified = true;
            await user.save();    
            console.log(user);
            return true;
        }
    }
    return false;
}

export async function findUserById(id: mongoose.Types.ObjectId){
    return await User.findById(id);
}

