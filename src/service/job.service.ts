import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Job,{JobDocument} from "../model/job.model";
import JobProposalService from './jobProposal.service';

class JobService {

    baseApi = new BaseCRUDApi<JobDocument>(Job);

    public async getMyJobs(userId:mongoose.Types.ObjectId, limit: number, page: number ){
        return (await Job.find({userId}).limit(limit).skip((page-1)*1));
    }

    public async getAllJobProposals(limit: number, page: number, jobId: mongoose.Types.ObjectId){
        return (await JobProposalService.getAllJobProposals(limit, page, jobId));
    }

}

const instance = new JobService();

export default instance;