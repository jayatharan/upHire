import {
    Model, Sequelize, UUIDV4
} from 'sequelize';

export interface AddressDocument {
    id:string;
    userId:string;
    address?:string;
    city?:string;
    country?:string;
    postCode?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
    class Address extends Model<AddressDocument>
    implements AddressDocument {
        id!:string;
        userId!: string;
        address?: string;
        city?: string;
        country?: string;
        postCode?: string;

        static associate(models:any){
            Address.belongsTo(models.User, {
                foreignKey: 'userId',
                as:'user'
            })
        }
    };
    Address.init({
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
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postCode: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        sequelize,
        modelName: 'Address'
    })
    return Address;
}