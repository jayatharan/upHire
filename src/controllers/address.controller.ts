import { Request, Response } from "express";
import { AddressDocument } from "../models/address.model";
import AddressService from "../services/address.service";
import { get } from "lodash";
import log from "../logger";
import { ListQueryParams } from "../services/baseCRUD.service";

export async function getAllAddress(req: Request, res: Response) {
    try{
        const quarryParams = req.query as ListQueryParams;
        const data = await AddressService.baseApi.list(quarryParams.page, quarryParams.limit);
        return res.send(data);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createAddress(req: Request, res: Response){
    try{
        const user = get(req, "user");
        const data = req.body as AddressDocument;
        data.userId = user.id;
        const response = await AddressService.baseApi.create(data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function updateAddress(req: Request, res: Response){
    try{
        const data = req.body as AddressDocument;
        const id = req.params.id as string;
        const response = await AddressService.baseApi.update(id, data);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteAddress(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await AddressService.baseApi.delete(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getAddress(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const response = await AddressService.baseApi.get(id);
        res.send(response);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}