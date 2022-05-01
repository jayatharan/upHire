import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface ProposalDocument {
    project:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    amount?:number;
    duration?:DateDuration;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const ProposalSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project",
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
    amount: {
        type:Number
    },
    duration: DateDurationSchema,
    status: {
        type: String
    }
},{
    timestamps:true
})

const Proposal = mongoose.model<ProposalDocument>("Proposal", ProposalSchema);

export default Proposal;