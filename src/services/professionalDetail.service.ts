import { ProfessionalDetailDocument } from "../models/professionalDetail.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import CompanyService from "./company.service";

const ProfessionalDetail = db.ProfessionalDetail;

class ProfessionalDetailService {
    baseApi = new baseCRUDApi<ProfessionalDetailDocument>(ProfessionalDetail)

    public async createOrUpdateProfessionalDetail(data:ProfessionalDetailDocument){
        if(data.company){
            const comapany = await CompanyService.baseApi.createOrUpdate({...data.company, userId:data.userId});
            data.companyId = comapany.id;
        }
        const ProfessionalDetail = await this.baseApi.createOrUpdate(data);
        return (await this.baseApi.get(ProfessionalDetail.id, undefined, [{association:'company', include:'address'}]));
    }
}

const instance = new ProfessionalDetailService();

export default instance;