import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    address: { type: String}
})

export default AddressSchema;