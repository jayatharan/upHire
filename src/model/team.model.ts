import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";
import TeamProposal from "./teamProposal.model";

export interface TeamDocument extends mongoose.Document{
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

TeamSchema.pre('remove', async function (next) {
    let team = this as TeamDocument;
    await TeamProposal.deleteMany({project:team._id});
    return next();
})

const Team = mongoose.model<TeamDocument>("Team", TeamSchema);

export default Team;