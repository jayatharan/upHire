import { Request, Response } from "express";
import { BiographyDocument } from "../models/biography.model";
import BiographyService from "../services/biography.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllBiography(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await BiographyService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createBiography(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as BiographyDocument;
        data.userId = user.id;
        const response = await BiographyService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateBiography(req: Request, res: Response){
    try{
        const data = req.body as BiographyDocument;
        const id = req.params.id as string;
        const response = await BiographyService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteBiography(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await BiographyService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getBiography(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await BiographyService.baseApi.get(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}