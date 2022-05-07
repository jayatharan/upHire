import mongoose from "mongoose";
import { CompanyBasicSchema, CompanyBasic, DateDurationSchema, DateDuration, AddressSchema, Address } from "./schemas";

export interface EducationalDetailDocument extends mongoose.Document{
    user: mongoose.Types.ObjectId;
    organizationName:string;
    address:Address;
    type:string;
    fieldName:string;
    courseName:string;
    duration:DateDuration;
    description:string;
}

const EducationalDetailSchema =  new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true
        },
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

const EducationalDetail = mongoose.model("EducationalDetail", EducationalDetailSchema);

export default EducationalDetail;