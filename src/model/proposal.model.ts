import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface ProposalDocument extends mongoose.Document{
    projectId:mongoose.Types.ObjectId;
    userId:mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?:boolean;
    amount?:number;
    startDate?: Date;
    endDate?: Date;
    status?:string;
    createdAt: Date;
    updateAt: Date;
}

const ProposalSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project",
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
    amount: {
        type:Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String
    }
},{
    timestamps:true
})

const Proposal = mongoose.model<ProposalDocument>("Proposal", ProposalSchema);

export default Proposal;