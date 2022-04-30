import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Project,{ProjectDocument} from "../model/project.model";
import Proposal,{ProposalDocument} from "../model/proposal.model";

class ProjectService {

    baseApi = new BaseCRUDApi<ProjectDocument>(Project);

    public async getAllProjectProposals(limit: number, page: number, projectId: mongoose.Schema.Types.ObjectId){
        return (await Proposal.find({project:projectId}).limit(limit).skip((page-1)*1));
    }
}

const instance = new ProjectService();

export default instance;