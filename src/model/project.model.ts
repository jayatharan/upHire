import mongoose from "mongoose";
import { AddressSchema, CompanyBasicSchema, DateDurationSchema, UserBasicSchema } from "./schemas";
import Proposal from "./proposal.model";

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

const Project = mongoose.model("Project", ProjectSchema);

export default Project;