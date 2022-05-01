import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import EducationalDetail, {EducationalDetailDocument} from "../model/educationalDetail.model";

class EducationalDetailService {

    baseApi = new BaseCRUDApi<EducationalDetailDocument>(EducationalDetail);

    public async getUserEducationalDetails(id: mongoose.Types.ObjectId){
        return await EducationalDetail.find({user:id})
    }

}

const instance = new EducationalDetailService();

export default instance;