import mongoose from "mongoose";
import JobProposal from "./jobProposal.model";
import { DateDurationSchema, UserBasicSchema, DateDuration, UserBasic, AddressSchema, Address } from "./schemas";

export interface JobDocument extends mongoose.Document{
    userId?: mongoose.Types.ObjectId;
    createBy?: UserBasic;
    title?: string;
    description?: string;
    salary?: number;
    type?:string;
    location:Address;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updateAt: Date;
}

const JobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createBy: UserBasicSchema,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
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
    await JobProposal.deleteMany({jobId:job._id});
    return next();
})

const Job = mongoose.model('Job', JobSchema);

export default Job;