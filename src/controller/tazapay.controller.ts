import { Request, Response } from "express";
import { 
  createUser, 
  getUserById, 
  updateUser, 
  createEscrow,
  getEscrowStatus,
  getEscrowSummary,
  addBank,
  bankList
} from "../service/tazapay.service";
import log from "../logger";

export async function createTazapayUser(req: Request, res: Response) {
  try{
    const userData = req.body;
    const tazapayResponse = await createUser(userData);
    return res.send(tazapayResponse);
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function getTazapayUserById(req: Request, res: Response) {
  try{
    const id = req.params.id as string;
    const tazapayResponse = await getUserById(id);
    return res.send(tazapayResponse); 
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function updateTazapayUser(req: Request, res: Response) {
  try{
    const userData = req.body;
    const tazapayResponse = await updateUser(userData);
    return res.send(tazapayResponse)
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function createTazapayEscrow(req: Request, res: Response) {
  try{
    const escrowData = req.body;
    const tazapayResponse = await createEscrow(escrowData);
    return res.send(tazapayResponse)
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function getTazapayEscrowStatus(req: Request, res: Response){
  try{
    const id = req.params.id as string;
    const tazapayResponse = await getEscrowStatus(id);
    return res.send(tazapayResponse); 
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function getTazapayEscrowSummary(req: Request, res: Response){
  try{
    const id = req.params.id as string;
    const tazapayResponse = await getEscrowSummary(id);
    return res.send(tazapayResponse); 
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function createTazapayBank(req: Request, res: Response) {
  try{
    const bankData = req.body;
    const tazapayResponse = await addBank(bankData);
    return res.send(tazapayResponse)
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}

export async function getTazapayBankList(req: Request, res: Response){
  try{
    const id = req.params.id as string;
    const tazapayResponse = await bankList(id);
    return res.send(tazapayResponse); 
  }catch(e){
    log.error(e);
    return res.status(400).send(e)
  }
}