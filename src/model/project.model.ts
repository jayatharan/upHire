import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";

export interface ProjectDocument {
    user?: mongoose.Schema.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?: boolean;
    title?: string;
    description?: string;
    category?: string;
    budget?: number;
    hourly?: number;
    timeline?: string;
    duration?: DateDuration;
    amount?: number;
    rate?: number;
    remainingAmount?: number;
    acceptedProposal?:mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updateAt: Date;
}

const ProjectSchema = new mongoose.Schema({
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
    category: {
        type: String
    },
    budget: {
        type: Number
    },
    hourly: {
        type: Number
    },
    timeline: {
        type: String
    },
    duration: DateDurationSchema,
    amount: {
        type: Number
    },
    rate: {
        type: Number,
        max:100,
        min:0
    },
    remainingAmount: {
        type: Number
    },
    acceptedProposal: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Proposal"
    }
},{
    timestamps:true
}
)

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;