import { Request, Response } from "express";
import { EducationalDetailDocument } from "../models/educationalDetail.model";
import EducationalDetailService from "../services/educationalDetail.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllEducationalDetail(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await EducationalDetailService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createEducationalDetail(req: Request, res: Response){
    try{
        const data = req.body as EducationalDetailDocument;
        const response = await EducationalDetailService.createOrUpdateEducationalDetail(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateEducationalDetail(req: Request, res: Response){
    try{
        const data = req.body as EducationalDetailDocument;
        const id = req.params.id as string;
        data.id = id;
        const response = await EducationalDetailService.createOrUpdateEducationalDetail(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteEducationalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await EducationalDetailService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getEducationalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await EducationalDetailService.baseApi.get(id, undefined, 'user');
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}