import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { get } from "lodash";
import Subscription from "../model/subscription.model";
import Project from "../model/project.model";
import Job from "../model/job.model";
import Team from "../model/team.model";

const isUserSubscribed = (service: String) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = get(req, "user");
        const subscription = await Subscription.findOne({user:user._id, service})
        if(subscription){
            return next();
        }else{
            const freeLimit = 10;
            let count = 0;
            switch(service){
                case "Project":
                    const projects = await Project.find({user:user._id});
                    count = projects.length;
                    break;
                case "Job":
                    const jobs = await Job.find({user:user._id});
                    count = jobs.length;
                    break;
                case "Team":
                    const teams = await Team.find({user:user._id});
                    count = teams.length;
                    break;
                default:
                    count = 100
            }
            if(count < freeLimit) return next();
            else return res.status(400).send({message:"Exceed your free limit."});
        }
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
};

export default isUserSubscribed;