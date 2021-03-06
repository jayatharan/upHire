import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import uuid from "node-uuid";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    role?: string;
    emailVerified?:boolean;
    emailVerificationGuid?:string;
    password?: string;
    createdAt?: Date;
    updateAt?: Date;
    alternativeEmail?:string;
    mobileNumber?:string;
    image?:string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        alternativeEmail: { type: String, require: false },
        name: { type: String, require: true },
        password: { type: String, require: false },
        role: { 
            type: String,
            enum: ["client", "admin", "student", "freelancer", "general"],
            default: "general"
        },
        emailVerified : {
            type:Boolean,
            default: false
        },
        emailVerificationGuid:{
            type: String,
            default:uuid.v1()
        },
        mobileNumber : {
            type: String
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    let user = this as UserDocument;
    if(user.password){
        // only hash the password if it has been modified (or is new)
        if (!user.isModified("password")) return next();
    
        // Random additional data
        const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
    
        const hash = await bcrypt.hashSync(user.password, salt);
    
        // Replace the password with the hash
        user.password = hash;
    }

    return next();
})

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password ?? '').catch((e) => false);
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;