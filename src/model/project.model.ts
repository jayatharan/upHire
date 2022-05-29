import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic } from "./schemas";
import Proposal from "./proposal.model";

export interface ProjectDocument extends mongoose.Document {
    userId?: mongoose.Types.ObjectId;
    createBy?: UserBasic;
    showContactDetails?: boolean;
    title?: string;
    description?: string;
    category?: string;
    budget?: number;
    hourly?: number;
    timeline?: string;
    startDate?: Date;
    endDate?: Date;
    amount?: number;
    rate?: number;
    remainingAmount?: number;
    acceptedProposal?:mongoose.Types.ObjectId;
    createdAt: Date;
    updateAt: Date;
}

const ProjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
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
})

ProjectSchema.pre('remove', async function (next) {
    let project = this as ProjectDocument;
    await Proposal.deleteMany({projectId:project._id});
    return next();
})

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;