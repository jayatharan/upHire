import mongoose from "mongoose";
import { AddressSchema, Address, CompanyBasicSchema, CompanyBasic, DateDurationSchema } from "./schemas";

export interface BiographyDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    company?: CompanyBasic;
    jobRole?:string;
    address?:Address;
    postCode?:string;
    image?:string;
}

const BiographySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
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
},{
    timestamps:true
})

const Biography = mongoose.model<BiographyDocument>("Biography", BiographySchema);

export default Biography;