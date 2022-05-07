import mongoose from "mongoose";
import Subscription,{ SubscriptionDocument } from "../model/subscription.model";
import BaseCRUDApi from "./baseCRUD.service";

class SubscriptionService {

    baseApi =  new BaseCRUDApi<SubscriptionDocument>(Subscription) 

    public async subscribeService(data: SubscriptionDocument) {
        let existingSubscription = await Subscription.findOne({user:data.user, service:data.service});
        let subscription;
        if(existingSubscription) {
            subscription = await this.baseApi.patch(existingSubscription._id, data);
        }else {
            subscription = await this.baseApi.create(data);
        }
        return subscription;
    }
    
    public async unSubscribe(userId: mongoose.Types.ObjectId, service:string) {
        let existingSubscription = await Subscription.findOne({userId, service:service});
        return await existingSubscription.remove();
    }

    public async getUserSubscriptions(id: mongoose.Types.ObjectId) {
        return await Subscription.find({user:id});
    }

}

const instance = new SubscriptionService();

export default instance;