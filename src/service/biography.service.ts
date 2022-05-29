import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Biography, {BiographyDocument} from "../model/biography.model";

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
        return (await Biography.findOne({userId:id}))
    }

}

const instance = new BiographyService();

export default instance;