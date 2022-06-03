import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";

export interface ProjectDetailDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    name:string;
    category:string;
    description?:string;
    startDate?: Date;
    endDate?: Date;
    images?: string[];
    technologies?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class ProjectDetail extends Model<ProjectDetailDocument>
    implements ProjectDetail {
        id!:string;
        userId!: string;
        name!:string;
        category!:string;
        description?:string;
        startDate?:Date;
        endDate?:Date;
        images?:string[];
        technologies?:string[];

        static associate(models:any){
            ProjectDetail.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
        }
    };
    ProjectDetail.init({
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
        category: {
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
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        technologies:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'ProjectDetail'
    });
    return ProjectDetail;
}