import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import ProjectDetail, {ProjectDetailDocument} from "../model/projectDetail.model";

class ProjectDetailService {

    baseApi = new BaseCRUDApi<ProjectDetailDocument>(ProjectDetail);

    public async getUserProjectDetails(id: mongoose.Types.ObjectId){
        return await ProjectDetail.find({userId:id});
    }

}

const instance = new ProjectDetailService();

export default instance;