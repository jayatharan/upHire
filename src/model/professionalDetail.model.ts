import mongoose from "mongoose";
import { CompanyBasicSchema, CompanyBasic, DateDurationSchema, DateDuration } from "./schemas";

export interface ProfessionalDetailDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    company: CompanyBasic;
    jobRole: string;
    startDate?: Date;
    endDate?: Date;
}

const ProfessionalDetailSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
        company: CompanyBasicSchema,
        jobRole: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },{
        timestamps:true
    }
)

const ProfessionalDetail = mongoose.model<ProfessionalDetailDocument>("ProfessionalDetail", ProfessionalDetailSchema);

export default ProfessionalDetail;