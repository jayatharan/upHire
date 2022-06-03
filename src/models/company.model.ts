import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { AddressDocument } from './address.model';
import { UserDocument } from './user.model';

export interface CompanyDocument{
    id:string;
    userId: string;
    user?:UserDocument;
    name: string;
    description?: string;
    addressId?:string;
    address?:AddressDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) =>{
    class Company extends Model<CompanyDocument>
    implements  CompanyDocument {
        id!:string;
        userId!: string;
        name!: string;
        description?: string | undefined;
        addressId?: string | undefined;

        static associate(models:any){
            Company.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
            Company.belongsTo(models.Address, {
                foreignKey: 'addressId',
                as:'address'
            })
        }
    };
    Company.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressId:{
            type: DataTypes.UUID,
            allowNull: true
        },
    },{
        sequelize,
        modelName: 'Company'
    });
    return Company;
}