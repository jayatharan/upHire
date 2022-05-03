import mongoose from "mongoose";
import { Request, Response } from "express";
import ProfessionalDetailService from "../service/professionalDetail.service";
import { ProfessionalDetailDocument } from "../model/professionalDetail.model";
import log from "../logger";
import { get } from "lodash";

export async function patchProfessionalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        let data = req.body as ProfessionalDetailDocument;
        const existingDetail = await ProfessionalDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.user.toString() !== user._id) return res.status(403).send();
        const professionalDetail = await ProfessionalDetailService.baseApi.patch(id, data);
        res.send(professionalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function deleteProfessionalDetail(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Types.ObjectId;
        const user = get(req, "user");
        const existingDetail = await ProfessionalDetailService.baseApi.get(id);
        if(existingDetail === null || existingDetail.user.toString() !== user._id) return res.status(403).send();
        const professionalDetail = await ProfessionalDetailService.baseApi.delete(id);
        res.send(professionalDetail);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}