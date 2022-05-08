import mongoose from "mongoose";
import { CompanyBasicSchema, CompanyBasic, DateDurationSchema, DateDuration } from "./schemas";

export interface ProfessionalDetailDocument extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    company: CompanyBasic;
    jobRole: string;
    duration: DateDuration;
}

const ProfessionalDetailSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
        company: CompanyBasicSchema,
        jobRole: {
            type: String
        },
        duration: DateDurationSchema 
    },{
        timestamps:true
    }
)

const ProfessionalDetail = mongoose.model<ProfessionalDetailDocument>("ProfessionalDetail", ProfessionalDetailSchema);

export default ProfessionalDetail;