import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";

export interface ProjectDocument {
    id:string;
    userId:string;
    user?:UserDocument;
    title: string;
    description?: string;
    category: string;
    budget: number;
    hourly?: number;
    timeline?: string;
    startDate?: Date;
    endDate?: Date;
    amount?: number;
    rate: number; 
    remainingAmount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Project extends Model<ProjectDocument>
    implements Project {
        id!:string;
        userId!:string;
        title!:string;
        description?:string;
        category!:string;
        budget!:number;
        hourly?:number;
        timeline?:string;
        startDate?:Date;
        endDate?:Date;
        amount?:number;
        rate!:number;
        
        static associate(models:any){
            Project.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
        }
    };
    Project.init({
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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        budget: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        hourly: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        timeline: {
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
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        rate: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Project'
    });
    return Project;
}