import mongoose, { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
import { sendUserVerificationMail } from "./email.service"

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try{
        const user = await User.create(input);
        await sendUserVerificationMail(user.email, user.emailVerificationGuid!);
        return user;
    } catch (error) {
        throw new Error("User create error");
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