import mongoose from "mongoose";
import JobProposal from "./jobProposal.model";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic, AddressSchema, Address } from "./schemas";

export interface JobDocument extends mongoose.Document{
    user?: mongoose.Types.ObjectId;
    createBy?: UserBasic;
    title?: string;
    description?: string;
    salary?: number;
    type?:string;
    location:Address;
    createdAt: Date;
    updateAt: Date;
}

const JobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createBy: UserBasicSchema,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: DateDurationSchema,
    salary: {
        type:Number
    },
    type:{
        type:String
    },
    location:{
        type: AddressSchema
    }
},{
    timestamps:true
})

JobSchema.pre('remove', async function (next) {
    let job = this as JobDocument;
    await JobProposal.deleteMany({job:job._id});
    return next();
})

const Job = mongoose.model('Job', JobSchema);

export default Job;