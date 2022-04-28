import mongoose from "mongoose";
import AddressSchema from "./address.shema";

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