import mongoose from "mongoose";
import { AddressSchema, CompanyBasicSchema, DateDuration, DateDurationSchema } from "./schemas";

export interface ProjectDetailDocument extends mongoose.Document{
    user: mongoose.Types.ObjectId;
    name: string;
    category: string;
    description: string;
    duration: DateDuration;
    images: string[];
    skills: string[];
}

const ProjectDetailSchema = new mongoose.Schema(
    {
        user: { 
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
        duration: DateDurationSchema,
        images: {
            type: [String]
        },
        skills: {
            type: [String]
        }
    }
)

const ProjectDetail = mongoose.model<ProjectDetailDocument>("ProjectDetail", ProjectDetailSchema);

export default ProjectDetail;