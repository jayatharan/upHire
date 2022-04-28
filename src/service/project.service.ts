import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Project,{ProjectDocument} from "../model/project.model";

class ProjectService {

    baseApi = new BaseCRUDApi<ProjectDocument>(Project);

}

const instance = new ProjectService();

export default instance;