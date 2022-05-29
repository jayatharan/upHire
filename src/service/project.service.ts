import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Project,{ProjectDocument} from "../model/project.model";
import ProposalService from './proposal.service';

class ProjectService {

    baseApi = new BaseCRUDApi<ProjectDocument>(Project);

    public async getMyProjects( userId:mongoose.Types.ObjectId, limit: number, page: number ) {
        return (await Project.find({userId}).limit(limit).skip((page-1)*1));
    }

    public async getAllProjectProposals(limit: number, page: number, projectId: mongoose.Types.ObjectId){
        return (await ProposalService.getAllProjectProposals(limit, page, projectId));
    }
}

const instance = new ProjectService();

export default instance;