import { ProjectDetailDocument } from "../models/projectDetail.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const ProjectDetail = db.ProjectDetail;

class ProjectDetailService {
    baseApi = new baseCRUDApi<ProjectDetailDocument>(ProjectDetail)

}

const instance = new ProjectDetailService();

export default instance;