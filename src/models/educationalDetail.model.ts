import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { AddressDocument } from './address.model';

export interface EducationalDetailDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    courseName:string;
    type:string;
    organizationName:string;
    description?:string;
    startDate?: Date;
    endDate?: Date;
    image?: string;
    addressId?:string;
    address?:AddressDocument;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class EducationalDetail extends Model<EducationalDetailDocument>
    implements EducationalDetail {
        id!:string;
        userId!: string;
        courseName!:string;
        organizationName!:string;
        type!:string;
        description?:string;
        startDate?:Date;
        endDate?:Date;
        image?:string;
        addressId?: string | undefined;
        static associate(models:any){
            EducationalDetail.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            EducationalDetail.belongsTo(models.Address, {
                foreignKey: 'addressId',
                as:'address'
            })
        }
    };
    EducationalDetail.init({
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
        courseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressId:{
            type: DataTypes.UUID,
            allowNull: true
        },
    },{
        sequelize,
        modelName: 'EducationalDetail'
    });
    return EducationalDetail;
}