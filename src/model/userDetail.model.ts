import mongoose from "mongoose";
import { AddressSchema, CompanyBasicSchema, DateDurationSchema } from "./schemas";

const BiographyDetailSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        company: CompanyBasicSchema,
        jobRole: {
            type: String
        },
        address: AddressSchema,
        image: {
            type: String
        }
    }
)

const ProfessionalDetailSchema = new mongoose.Schema(
    {
        company: CompanyBasicSchema,
        jobRole: {
            type: String
        },
        duration: DateDurationSchema 
    }
)

const EducationalDetailSchema =  new mongoose.Schema(
    {
        organizationName: {
            type: String
        },
        address: AddressSchema,
        type: {
            type: String
        },
        fieldName: {
            type: String
        },
        courseName: {
            type: String
        },
        duration: DateDurationSchema,
        description: {
            type: String
        }
    }
)

const ProjectDetailSchema = new mongoose.Schema(
    {
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
            type: String
        }
    }
)

const UserDetailSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        BiographyDetail:BiographyDetailSchema,
        professionalDetails:[ProfessionalDetailSchema],
        educationalDetails:[EducationalDetailSchema],
        workDetails:[ProjectDetailSchema]
    }
)

const UserDetail = mongoose.model("UserDetail", UserDetailSchema)

export default UserDetail;