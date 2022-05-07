import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface JobProposalDocument extends mongoose.Document {
    job:mongoose.Types.ObjectId,
    user:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const JobProposalSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job",
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

const JobProposal = mongoose.model<JobProposalDocument>("JobProposal", JobProposalSchema);

export default JobProposal;