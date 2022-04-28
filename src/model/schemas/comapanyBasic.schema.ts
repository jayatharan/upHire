import mongoose from "mongoose";
import AddressSchema,{Address} from "./address.shema";

export interface CompanyBasic {
    name?:string;
    description?:string;
    address?:Address;
}

const CompanyBasicSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        type: AddressSchema
    }
})

export default CompanyBasicSchema;