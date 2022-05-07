import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface TeamProposalDocument {
    team:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const TeamProposalSchema = new mongoose.Schema({
    team:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Team",
        required:true
    },
    user: { 
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