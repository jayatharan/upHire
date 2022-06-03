export interface ListQueryParams{
    page?:number;
    limit?:number;
}

export default class baseCRUDApi<T> {
    public model: any

    public constructor(model: any){
        this.model = model;
    }

    public async list(page?:number, limit?:number, where?:any, order?:any, attributes?:string[], include?:any){
        let offset:number|undefined;
        if(page && limit){
            offset = (page-1)*limit;
        }
        return (await this.model.findAndCountAll({
            include,
            where,
            order,
            attributes,
            offset,
            limit
        }
        ))
    }

    public async find(where?:any, attributes?:string[], include?:any){
        return (await this.model.findOne({
            include,
            where,
            attributes
        }))
    }

    public async get(id:string, attributes?:string[], include?:any){
        return (await this.model.findByPk(id,{attributes, include}));
    }

    public async create(data:any){
        delete data.id; 
        return (await this.model.create(data));
    }

    public async update(id:string, data:T, attributes?:string[], include?:any){
        await this.model.update(data, {
            where: {
                id
            }
        });
        return (await this.get(id,attributes, include));
    }

    public async delete(id:string){
        return (await this.model.destroy({
            where: {
                id: id
            }
        }))
    }

    public async createOrUpdate(data:any){
        let response:T;
        if(!data.id){
            response = await this.create(data);
        }else{
            response = await this.update(data.id, data);
        }
        return response;
    }
}
