import express from "express";
import config from "config";
import log from "./logger";
import cors from "cors";
import db from './models';
import router from "./routes";
import {deserializeUser} from "./middleware";
import { upload } from "./utils/file.util"
import { Request, Response } from "express";
import { get } from "lodash";

const port = config.get("port") as number;
const host = config.get("host") as string;

const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroSequelize = require('@admin-bro/sequelize')

const app = express();

AdminBro.registerAdapter(AdminBroSequelize)

const adminBro = new AdminBro({
    databases: [db],
    rootPath: '/admin',
})

const adminBroRouter = AdminBroExpress.buildRouter(adminBro)

app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.use('/static', express.static('static'));
app.use('/postmon', express.static('./UPHIRE_PERN.postman_collection.json'));

app.post('/upload-file', upload.single('file'), async (req:Request, res:Response) => {
    try{
        const file = get(req, 'file');
        if(file){
            res.send(file)
        }else{
            return res.status(400).send();
        }
    }catch(e){
        log.error(e);
        return res.status(400).send(e);
    }
})

app.use(adminBro.options.rootPath, adminBroRouter)

db.sequelize.sync({alter:true}).then(() => {
    app.listen(port, host, () => {
        log.info(`Server listing at http://${host}:${port}`);
    });
}).catch(()=>{
    log.error("Something went wrong");
})