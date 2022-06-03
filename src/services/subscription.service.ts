import { SubscriptionDocument } from "../models/subscription.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Subscription  = db.Subscription;

class SubscriptionService {
    baseApi = new baseCRUDApi<SubscriptionDocument>(Subscription);

    public async subscribeService(data: SubscriptionDocument) {
        const existingSubscription = await this.baseApi.find({userId:data.userId, service:data.service});
        let subscription;
        if(existingSubscription){
            subscription = await this.baseApi.update(existingSubscription.id,data);
        }else{
            subscription = await this.baseApi.create(data);
        }
        return subscription;
    }

    public async unSubscribe(userId:string, service:string){
        const existingSubscription = await this.baseApi.find({userId, service});
        return await this.baseApi.delete(existingSubscription.id);
    }

    public async getUserSubscriptions(userId:string){
        return (await this.baseApi.list(undefined, undefined, {userId})).rows;
    }

}

const instance = new SubscriptionService();

export default instance;