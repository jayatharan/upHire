import bcrypt from "bcrypt";
import config from "config";

import {
    Model, Sequelize, UUIDV4
} from 'sequelize';
//DataTypes.ENUM(["client", "admin", "student", "freelancer", "general"])
export interface UserDocument {
    id?:string;
    email: string;
    name: string;
    role?: string;
    emailVerified?:boolean;
    emailVerificationGuid?:string;
    password?: string;
    createdAt?: Date;
    updateAt?: Date;
    alternativeEmail?:string;
    mobileNumber?:string;
    image?:string;
} 

module.exports = (sequelize:any, DataTypes:any) => {
    class User extends Model<UserDocument>
    implements UserDocument {
        id!:string;
        email!: string;
        name!: string;
        role!: string;
        emailVerified?:boolean;
        emailVerificationGuid?:string;
        password?: string;
        alternativeEmail?:string;
        mobileNumber?:string;
        image?:string;
    };
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"general"
        },
        emailVerificationGuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alternativeEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks:{
            beforeSave : async (user, options) => {
                if(user.password){
                    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
                    const hash = await bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                }
            }
        },
        sequelize,
        modelName: 'User'
    });
    return User;
}