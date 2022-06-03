import { AddressDocument } from "../models/address.model";
import db from '../models';
import baseCRUDApi from "./baseCRUD.service";

const Address = db.Address;

class AddressService {
    baseApi = new baseCRUDApi<AddressDocument>(Address);

}

const instance = new AddressService();

export default instance;