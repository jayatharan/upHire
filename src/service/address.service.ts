import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Address, { AddressDocument } from "../model/address.model";

class AddressService {
    baseApi = new BaseCRUDApi<AddressDocument>(Address);
}

const instance = new AddressService()

export default instance;