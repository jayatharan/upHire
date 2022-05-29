import mongoose from "mongoose";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic, AddressSchema, Address } from "./schemas";

export interface SubscriptionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    service:string;
    startDate?: Date;
    endDate?: Date;
    type: string;
    amount: number;
}

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: {
        type: String,
        enum:["Project", "Job", "Team"],
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
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

