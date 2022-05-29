import mongoose from "mongoose";
import { CompanyBasicSchema, CompanyBasic, DateDurationSchema, DateDuration, AddressSchema, Address } from "./schemas";

export interface EducationalDetailDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    organizationName:string;
    address:Address;
    type:string;
    fieldName:string;
    courseName:string;
    startDate?: Date;
    endDate?: Date;
    description:string;
}

const EducationalDetailSchema =  new mongoose.Schema(
    {
        userId: { 
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
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        description: {
            type: String
        }
    },{
        timestamps:true
    }
)

const EducationalDetail = mongoose.model("EducationalDetail", EducationalDetailSchema);

export default EducationalDetail;