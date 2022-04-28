import mongoose from "mongoose";

export interface Address {
    address?:string
}

const AddressSchema = new mongoose.Schema({
    address: { type: String}
})

export default AddressSchema;