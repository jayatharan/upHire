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

export async function updateUser(id:string, userData:any) {
  try{
    const res = await makeRequest('PUT', '/v1/user', {...userData, account_id:id})
    return res;
  }catch(error){
    log.error(error);
    throw error;
  }
}