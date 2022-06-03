import { CompanyDocument } from "../models/company.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";
import AddressService from "./address.service";

const Company = db.Company;

class CompanyService {
    baseApi = new baseCRUDApi<CompanyDocument>(Company);

    public async createOrUpdateCompany(data:CompanyDocument){
        if(data.address){
            const address = await AddressService.baseApi.createOrUpdate({...data.address, userId:data.userId});
            data.addressId = address.id;
        }
        const company = await this.baseApi.createOrUpdate(data);
        return (await this.baseApi.get(company.id, undefined, 'address'));
    }
}

const instance = new CompanyService();

export default instance;