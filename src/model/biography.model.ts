import mongoose from "mongoose";
import { CompanyBasicSchema, CompanyBasic } from "./schemas";
import {AddressDocument} from "./address.model";


export interface BiographyDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    firstName?: string;
    lastName?: string;
    company?: CompanyBasic;
    jobRole?:string;
    addressId?:mongoose.Types.ObjectId;
    address?:AddressDocument;
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
    addressId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Address"
    },
    image: {
        type: String
    }
},{
    timestamps:true
})

const Biography = mongoose.model<BiographyDocument>("Biography", BiographySchema);

export default Biography;