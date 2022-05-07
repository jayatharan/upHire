import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Team,{TeamDocument} from "../model/team.model";
import TeamProposal,{TeamProposalDocument} from "../model/teamProposal.model";

class TeamService {

    baseApi = new BaseCRUDApi<TeamDocument>(Team);

    public async getMyTeams( user:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await Team.find({user}).limit(limit).skip((page-1)*1));
    }

    public async getAllTeamProposals(limit: number, page: number, TeamId: mongoose.Types.ObjectId){
        return (await TeamProposal.find({Team:TeamId}).limit(limit).skip((page-1)*1));
    }
}

const instance = new TeamService();

export default instance;