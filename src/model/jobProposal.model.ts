import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface JobProposalDocument extends mongoose.Document {
    jobId:mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const JobProposalSchema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Job",
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

const JobProposal = mongoose.model<JobProposalDocument>("JobProposal", JobProposalSchema);

export default JobProposal;