import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import TeamProposal,{ TeamProposalDocument } from "../model/teamProposal.model";

class TeamProposalService {

    baseApi = new BaseCRUDApi<TeamProposalDocument>(TeamProposal);

    public async getMyTeamProposals( user:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await TeamProposal.find({user}).limit(limit).skip((page-1)*1));
    }
}

const instance = new TeamProposalService();

export default instance;