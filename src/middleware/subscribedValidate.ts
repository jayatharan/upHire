import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { get } from "lodash";
import SubscriptionService  from "../services/subscription.service";

const isUserSubscribed = (service:"Project"|"Job"|"Team") => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const user = get(req, "user");
        const subscription = await SubscriptionService.baseApi.find({userId:user.id, service})
        if(subscription){
            return next();
        }else{
            return next();
        }
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export default isUserSubscribed;
