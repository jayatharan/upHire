import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
import { UserDocument } from "./user.model";

export interface SubscriptionDocument{
    id:string;
    userId: string;
    user?:UserDocument;
    service:"Project"|"Job"|"Team";
    startDate?:Date;
    type:"Limited"| "Monthly"| "Yearly"| "Unlimited"
    endDate?:Date;
    amount:number;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Subscription extends Model<SubscriptionDocument>
    implements SubscriptionDocument {
        id!:string;
        userId!: string;
        service!:"Project"|"Job"|"Team";
        type!:"Limited"| "Monthly"| "Yearly"| "Unlimited"
        startDate?: Date | undefined;
        endDate?: Date | undefined;
        amount!:number;

        static associate(models:any){
            Subscription.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            });
        }
    };
    Subscription.init({
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
        service: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"Limited"
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
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Subscription'
    });
    return Subscription;
}