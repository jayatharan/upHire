import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface TeamProposalDocument extends mongoose.Document{
    teamId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const TeamProposalSchema = new mongoose.Schema({
    teamId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Team",
        required:true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required:true
    },
    createBy: UserBasicSchema,
    showContactDetails: {
        type: Boolean
    },
    status: {
        type: String
    }
},{
    timestamps:true
})

const TeamProposal = mongoose.model("TeamProposal", TeamProposalSchema);

export default TeamProposal;