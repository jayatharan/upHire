import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic, AddressSchema, Address } from "./schemas";

export interface SubscriptionDocument extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    service:string;
    duration?: DateDuration;
    type: string;
    amount: number;
}

const SubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: {
        type: String,
        enum:["Project", "Job", "Team"],
        required: true
    },
    duration: {
        type: DateDurationSchema
    },
    type: {
        type:String,
        enum:["Limited", "Monthly", "Yearly", "Unlimited"],
        required:true
    },
    amount: {
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;

