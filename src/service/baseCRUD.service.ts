import mongoose from "mongoose";
import { DocumentDefinition } from "mongoose";

// export interface BaseCRUD<T> {
//     list: (limit: number, page: number)=>Promise<mongoose.HydratedDocument<T, {}, {}>[]>;
//     get: (id: mongoose.Schema.Types.ObjectId)=>Promise<mongoose.HydratedDocument<T, {}, {}> | null>;
//     create: (data:T)=>Promise<mongoose.HydratedDocument<T, {}, {}>>;
//     update: (id: mongoose.Schema.Types.ObjectId, data:T)=>Promise<any>
//     delete: (id: mongoose.Schema.Types.ObjectId)=>Promise<any>
// }

export default class BaseCRUDApi<T> {
    model: mongoose.Model<T>;
    
    constructor(model: mongoose.Model<T>) {
        this.model = model;
    }

    public async list(limit: number, page: number) {
        return (await this.model.find().limit(limit).skip((page-1)*1));
    }

    public async get(id: mongoose.Schema.Types.ObjectId) {
        return (await this.model.findById(id));
    }

    public async create(data:DocumentDefinition<T>) {
        return (await this.model.create(data));
    }

    public async update(id: mongoose.Schema.Types.ObjectId, data:T){
        return (await this.model.updateOne({_id:id}, data));
    }

    public async delete(id: mongoose.Schema.Types.ObjectId){
        return (await this.model.deleteOne({_id:id}));
    }
}