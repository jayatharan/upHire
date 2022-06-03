import { ProjectDocument } from "../models/project.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Project = db.Project;

class ProjectService {
    baseApi = new baseCRUDApi<ProjectDocument>(Project);

}

const instance = new ProjectService();

export default instance;