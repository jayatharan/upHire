import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import JobProposal,{ JobProposalDocument } from "../model/jobProposal.model";

class JobProposalService {

    baseApi = new BaseCRUDApi<JobProposalDocument>(JobProposal);

    public async getMyJobProposals( userId:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await JobProposal.find({userId}).limit(limit).skip((page-1)*1));
    }

}

const instance = new JobProposalService();

export default instance;