import mongoose from "mongoose";
import { Request, Response } from "express";
import AddressService from "../service/address.service";
import { AddressDocument } from "../model/address.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function createAddress(req:Request, res:Response) {
    try{
        const user = get(req, "user");
        let data = req.body as AddressDocument;
        data.userId = user._id;
        const address = await AddressService.baseApi.create(data);
        res.send(address);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchAddress(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        let data = req.body as AddressDocument;
        const address = await AddressService.baseApi.patch(id, data);
        res.send(address);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteAddress(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const Address = await AddressService.baseApi.get(id);
        await Address?.remove();
        res.send(Address);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}