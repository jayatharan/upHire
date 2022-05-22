import mongoose from "mongoose";

export interface Address {
    address?:string
}

const AddressSchema = new mongoose.Schema({
    address: { type: String},
    city:{type: String},
    country:{type: String},
    postCode:{type: String}
})

export default AddressSchema;