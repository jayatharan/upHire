import mongoose from "mongoose";
import { AddressSchema, CompanyBasicSchema, DateDuration, DateDurationSchema } from "./schemas";

export interface ProjectDetailDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    name: string;
    category: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    images: string[];
    skills: string[];
}

const ProjectDetailSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
        name: {
            type: String
        },
        category: {
            type: String
        },
        description: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        images: {
            type: [String]
        },
        skills: {
            type: [String]
        }
    },{
        timestamps:true
    }
)

const ProjectDetail = mongoose.model<ProjectDetailDocument>("ProjectDetail", ProjectDetailSchema);

export default ProjectDetail;