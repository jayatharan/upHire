import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Team,{TeamDocument} from "../model/team.model";
import TeamProposal,{TeamProposalDocument} from "../model/teamProposal.model";

class TeamService {

    baseApi = new BaseCRUDApi<TeamDocument>(Team);

    public async getMyTeams( userId:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await Team.find({userId}).limit(limit).skip((page-1)*1));
    }

    public async getAllTeamProposals(limit: number, page: number, TeamId: mongoose.Types.ObjectId){
        return (await TeamProposal.find({TeamId}).limit(limit).skip((page-1)*1));
    }
}

const instance = new TeamService();

export default instance;