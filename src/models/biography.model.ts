import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { AddressDocument } from './address.model';
import { CompanyDocument } from './company.model';
import { UserDocument } from './user.model';

export interface BiographyDocument{
    id:string;
    userId: string;
    user?:UserDocument;
    firstName?: string;
    lastName?: string;
    companyId?: string;
    company?:CompanyDocument;
    jobRole?:string;
    addressId?:string;
    address?:AddressDocument;
    image?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) =>{
    class Biography extends Model<BiographyDocument>
    implements  BiographyDocument {
        id!:string;
        userId!: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
        companyId?: string | undefined;
        jobRole?: string | undefined;
        addressId?: string | undefined;
        image?: string | undefined;

        static associate(models:any){
            Biography.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            Biography.belongsTo(models.Address, {
                foreignKey: 'addressId',
                as:'address'
            });
            Biography.belongsTo(models.Company, {
                foreignKey: 'companyId',
                as:'company'
            });
        }
    };
    Biography.init({
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
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        jobRole: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressId:{
            type: DataTypes.UUID,
            allowNull: true
        },
        companyId:{
            type: DataTypes.UUID,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'Biography'
    });
    return Biography;
}