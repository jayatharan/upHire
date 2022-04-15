import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updateAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        name: { type: String, require: true },
        password: { type: String, require: true }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    let user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace the password with the hash
    user.password = hash;

    return next();
})

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;