import {
    Model, Sequelize, UUIDV4
} from 'sequelize';

export interface SessionDocument {
    id:string;
    userId:string;
    valid: boolean;
    userAgent: string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Session extends Model<SessionDocument>
    implements SessionDocument {
        id!:string;
        userId!:string;
        valid!: boolean;
        userAgent!: string;

        static associate(models:any){
            Session.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
        }
    };
    Session.init({
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
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue:true,
            allowNull: false
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'Session'
    });
    return Session;
}