import { Request, Response } from "express";
import { ProfessionalDetailDocument } from "../models/professionalDetail.model";
import ProfessionalDetailService from "../services/professionalDetail.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllProfessionalDetail(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await ProfessionalDetailService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProfessionalDetail(req: Request, res: Response){
    try{
        const data = req.body as ProfessionalDetailDocument;
        const response = await ProfessionalDetailService.createOrUpdateProfessionalDetail(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateProfessionalDetail(req: Request, res: Response){
    try{
        const data = req.body as ProfessionalDetailDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await ProfessionalDetailService.createOrUpdateProfessionalDetail(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProfessionalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProfessionalDetailService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProfessionalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await ProfessionalDetailService.baseApi.get(id, undefined, 'user');
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}