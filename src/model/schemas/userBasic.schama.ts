import mongoose from "mongoose";

const UserBasicSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String
    },
    jobRole: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    mobileNumber : {
        type: String
    }
})

export default UserBasicSchema;