import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import ProfessionalDetail, {ProfessionalDetailDocument} from "../model/professionalDetail.model";

class ProfessionalDetailService {

    baseApi = new BaseCRUDApi<ProfessionalDetailDocument>(ProfessionalDetail);

    public async getUserProfessionalDetails(id: mongoose.Types.ObjectId){
        return await ProfessionalDetail.find({userId:id});
    }

}

const instance = new ProfessionalDetailService();

export default instance;