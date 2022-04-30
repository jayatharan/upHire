import mongoose from "mongoose";
import BaseCRUDApi from "./baseCRUD.service";
import Proposal,{ProposalDocument} from "../model/proposal.model";

class ProposalService {

    baseApi = new BaseCRUDApi<ProposalDocument>(Proposal);

}

const instance = new ProposalService();

export default instance;