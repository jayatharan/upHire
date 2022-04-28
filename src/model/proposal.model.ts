import mongoose from "mongoose";
import { AddressSchema, CompanyBasicSchema, DateDurationSchema, UserBasicSchema } from "./schemas";

const ProposalSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId, ref: "Project"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

const Proposal = mongoose.model("Proposal", ProposalSchema);

export default Proposal;