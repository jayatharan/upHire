import { EducationalDetailDocument } from "../models/educationalDetail.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import AddressService from "./address.service";

const EducationalDetail = db.EducationalDetail;

class EducationalDetailService {
    baseApi = new baseCRUDApi<EducationalDetailDocument>(EducationalDetail)

    public async createOrUpdateEducationalDetail(data:EducationalDetailDocument){
        if(data.address){
            const address = await AddressService.baseApi.createOrUpdate({...data.address, userId:data.userId});
            data.addressId = address.id;
        }
        const educationalDetail = await this.baseApi.createOrUpdate(data);
        return (await this.baseApi.get(educationalDetail.id, undefined, 'address'));
    }
}

const instance = new EducationalDetailService();

export default instance;