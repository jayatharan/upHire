import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Biography, {BiographyDocument} from "../model/biography.model";
import AddressService from "./address.service";

class BiographyService {

    baseApi = new BaseCRUDApi<BiographyDocument>(Biography);

    public async updateBiography(data:BiographyDocument){
        let biography = await Biography.findOne({userId:data.userId})
        if(biography){
            biography = await this.baseApi.patch(biography._id, data);
        }else{
            biography = await this.baseApi.create(data)
        }
        return biography;
    }

    public async getUserBiography(id: mongoose.Types.ObjectId){
        const data = await Biography.findOne({userId:id});
        let biography = data?.toJSON();
        if(biography?.addressId){
            const address = await AddressService.baseApi.get(biography.addressId)
            if(address) biography = {...biography, address}
        }
        return biography;
    }

}

const instance = new BiographyService();

export default instance;