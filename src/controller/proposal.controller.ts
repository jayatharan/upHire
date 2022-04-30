import mongoose from "mongoose";
import { Request, Response } from "express";
import ProposalService from "../service/proposal.service";
import { ProposalDocument } from "../model/proposal.model";
import log from "../logger";
import { get } from "lodash";
import { Pagination, extractPagination } from "../utils/query.utils";

export async function getAllProposals(req: Request, res: Response) {
    try{
        const pagination:Pagination = extractPagination(req);
        const proposals = await ProposalService.baseApi.list(pagination.limit, pagination.page)
        return res.send(proposals)
    } catch (e) {
        log.error(e);
        return res.status(400).send(e)
    }
}

export async function createProposal(req: Request, res: Response) {
    try{
        const user = get(req, "user");
        let data = req.body as ProposalDocument;
        data.user = user._id;
        data.createBy = {
            user:user._id,
            name:user.name,
            email:user.email
        }
        const proposal = await ProposalService.baseApi.create(data);
        res.send(proposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function getProposalById(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Schema.Types.ObjectId;
        const proposal = await ProposalService.baseApi.get(id);
        res.send(proposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}

export async function patchProposal(req: Request, res: Response) {
    try{
        const id = req.params.id as unknown as mongoose.Schema.Types.ObjectId;
        let data = req.body as ProposalDocument;
        const proposal = await ProposalService.baseApi.patch(id, data);
        res.send(proposal);
    }catch (e) {
        log.error(e);
        return res.status(400).send(e);
    }
}