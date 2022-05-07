import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import router from "./routes";
import { deserializeUser } from "./middleware";
import { upload } from "./utils/file.util";
import { Request, Response } from "express";
import { get } from "lodash";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use('/static', express.static('static'));
app.use('/postmon', express.static('postmon'));

app.post('/upload-file',upload.single('file'),async (req:Request, res:Response) => {
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

app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`);
    connect();
});