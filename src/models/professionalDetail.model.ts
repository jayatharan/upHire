import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";
import { CompanyDocument } from './company.model';

export interface ProfessionalDetailDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    companyId: string;
    company?:CompanyDocument;
    jobRole:string;
    description?:string;
    startDate?: Date;
    endDate?: Date;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class ProfessionalDetail extends Model<ProfessionalDetailDocument>
    implements ProfessionalDetail {
        id!:string;
        userId!: string;
        companyId!: string;
        jobRole!:string;
        description?:string;
        startDate?:Date;
        endDate?:Date;
        image?:string;

        static associate(models:any){
            ProfessionalDetail.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
            ProfessionalDetail.belongsTo(models.Company, {
                foreignKey: 'companyId',
                as:'company'
            });
        }
    };
    ProfessionalDetail.init({
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
        jobRole: {
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
        companyId:{
            type: DataTypes.UUID,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'ProfessionalDetail'
    });
    return ProfessionalDetail;
}