import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Proposal,{ ProposalDocument } from "../model/proposal.model";

class ProposalService {

    baseApi = new BaseCRUDApi<ProposalDocument>(Proposal);

    public async getMyProposals( userId:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await Proposal.find({userId}).limit(limit).skip((page-1)*1));
    }
}

const instance = new ProposalService();

export default instance;