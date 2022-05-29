import mongoose from "mongoose";

export interface AddressDocument extends mongoose.Document{
    userId:mongoose.Types.ObjectId;
    address?:string;
    city?:string;
    country?:string;
    postCode?:string;
}

const AddressSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    address: { type: String},
    city:{type: String},
    country:{type: String},
    postCode:{type: String}
},{
    timestamps:true
})

const Address =  mongoose.model<AddressDocument>("Address", AddressSchema);

export default Address;