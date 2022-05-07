import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface TeamDocument {
    project:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    createdAt: Date;
    updateAt: Date;
}

const TeamSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createBy: UserBasicSchema,
    showContactDetails: {
        type: Boolean
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    project:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project",
        required:true
    }
},{
    timestamps:true
})

const Team = mongoose.model<TeamDocument>("Team", TeamSchema);

export default Team;