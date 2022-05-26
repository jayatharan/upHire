import log from "../logger";
import { makeRequest } from "../utils/tazapay.utils";

export async function createUser(userData:any) {
  try{
    const res = await makeRequest('POST', '/v1/user', userData)
    return res;
  }catch(error){
    log.error(error)
    throw error;
  }
}

export async function getUserById(id: string) {
  try{
    const res = await makeRequest('GET', `/v1/user/${id}`, null);
    return res;
  }catch(error){
    log.error(error)
    throw error;
  }
}

export async function updateUser(userData:any) {
  try{
    const res = await makeRequest('PUT', '/v1/user', userData)
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}

export async function createEscrow(escrowData:any) {
  try{
    const res = await makeRequest('POST', '/v1/escrow', escrowData)
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}

export async function getEscrowStatus(txt_no:string) {
  try{
    const res = await makeRequest('GET', `/v1/escrow/${txt_no}`, null)
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}

export async function getEscrowSummary(txt_no:string) {
  try{
    const res = await makeRequest('GET', `/v1/escrow/${txt_no}/summary`, null)
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}

export async function addBank(bankData:any) {
  try{
    const res = await makeRequest('POST', '/v1/bank', bankData);
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}

export async function bankList(id: string) {
  try{
    const res = await makeRequest('GET', `/v1/bank/${id}`, null);
    return res;
  }catch(error){
    log.error(error)
    throw error;
  }
}