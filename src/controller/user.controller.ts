import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, verifyEmail, updateUser, findUserById } from "../service/user.service";
import { BiographyDocument } from "../model/biography.model";
import { ProfessionalDetailDocument } from "../model/professionalDetail.model"
import { EducationalDetailDocument } from "../model/educationalDetail.model";
import { ProjectDetailDocument } from "../model/projectDetail.model";
import { SubscriptionDocument } from "../model/subscription.model";
import BiographyService from "../service/biography.service";
import ProfessionalDetailService from "../service/professionalDetail.service";
import EducationalDetailService from "../service/educationalDetail.service";
import ProjectDetailService from "../service/projectDetail.service";
import SubscriptionService  from "../service/subscription.service";

import log from "../logger";
import { get } from "lodash";

export interface EmailVerificationBody {
    email:string,
    guid:string
} 

export interface UserDetailsUpdateBody {
    email?:string;
    name?:string;
    role?:string;
    password?:string;
    alternativeEmail?:string;
    mobileNumber?:string;
    image?:string;
}

export async function createUserHandler(req: Request, res: Response) {
    try{
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e) {
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function updateUserHandler(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const updatedUser = await updateUser(user, req.body);
        return res.send(omit(updatedUser.toJSON(), "password"))
    } catch (e){
        log.error(e);
        return res.status(409).send(e)
    }
}

export async function updateUserBiography(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as BiographyDocument;
        data.user = user._id;
        let biography = await BiographyService.updateBiography(data)
        res.send(biography);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function addUserProfessionalDetail(req: Request, res: Response){
    try{
        const user = get(req, "user");
        let data = req.body as ProfessionalDetailDocument;
        data.user = user._id;
        let professionalDetail = await ProfessionalDetailService.baseApi.create(data);
        res.send(professionalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function addUserEducationalDetail(req: Request, res:Response){
    try{
        const user = get(req, "user");
        let data = req.body as EducationalDetailDocument;
        data.user = user._id;
        let educationalDetail = await EducationalDetailService.baseApi.create(data);
        res.send(educationalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function addUserProjectDetail(req: Request, res:Response){
    try{
        const user = get(req, "user");
        let data = req.body as ProjectDetailDocument;
        data.user = user._id;
        let projectDetail = await ProjectDetailService.baseApi.create(data);
        res.send(projectDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function getUserDetails(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let currentUser = await findUserById(user._id);
        let biography = await BiographyService.getUserBiography(user._id);
        let professionalDetails = await ProfessionalDetailService.getUserProfessionalDetails(user._id);
        let educationalDetails = await EducationalDetailService.getUserEducationalDetails(user._id);
        let projectDetails = await ProjectDetailService.getUserProjectDetails(user._id);
        res.send({user:currentUser, biography, professionalDetails, educationalDetails, projectDetails});
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function verifyEmailAddress(req: Request, res: Response) {
    try{
        const data = req.body as EmailVerificationBody;
        const verified = await verifyEmail(data);
        if(verified) return res.send({success: true});
        return res.status(400).send({success: false});
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function subscribeService(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as SubscriptionDocument;
        data.user = user._id;
        const subscription = await SubscriptionService.subscribeService(data);
        return res.send(subscription);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function unSubscribe(req: Request, res: Response) {
    try{
        const service = req.params.service as unknown as string;
        const user = get(req, "user");
        const result = await SubscriptionService.unSubscribe(user._id, service);
        return res.send(result);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getMySubscriptions(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        const subscriptions = await SubscriptionService.getUserSubscriptions(user._id);
        return res.send(subscriptions);
    }catch (e){
        log.error(e);
        return res.status(400).send(e);
    }
}

