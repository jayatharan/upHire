import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import { BiographyDocument } from "../model/biography.model";
import { ProfessionalDetailDocument } from "../model/professionalDetail.model"
import { EducationalDetailDocument } from "../model/educationalDetail.model";
import BiographyService from "../service/biography.service";
import ProfessionalDetailService from "../service/professionalDetail.service";
import EducationalDetailService from "../service/educationalDetail.service";

import log from "../logger";
import { get } from "lodash";

export async function createUserHandler(req: Request, res: Response) {
    try{
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e) {
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

export async function getUserDetails(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let biography = await BiographyService.getUserBiography(user._id);
        let professionalDetails = await ProfessionalDetailService.getUserProfessionalDetails(user._id);
        let educationalDetails = await EducationalDetailService.getUserEducationalDetails(user._id);
        res.send({user, biography, professionalDetails, educationalDetails})
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}