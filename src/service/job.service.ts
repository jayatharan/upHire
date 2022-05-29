import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Job,{JobDocument} from "../model/job.model";
import JobProposal from "../model/jobProposal.model";

class JobService {

    baseApi = new BaseCRUDApi<JobDocument>(Job);

    public async getMyJobs(userId:mongoose.Types.ObjectId, limit: number, page: number ){
        return (await Job.find({userId}).limit(limit).skip((page-1)*1));
    }

    public async getAllJobProposals(limit: number, page: number, jobId: mongoose.Types.ObjectId){
        return (await JobProposal.find({jobId}).limit(limit).skip((page-1)*1));
    }

}

const instance = new JobService();

export default instance;