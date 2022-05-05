import nodemailer from "nodemailer";
import config from "config";
import log from "../logger";

const mail_service = config.get("emailService") as string;
const username = config.get("emailUsername") as string;
const password = config.get("emailPassword") as string;

const transporter = nodemailer.createTransport({
    service: mail_service,
    auth: {
        user:username,
        pass:password
    }
})

export const sendMail = (to:string, subject:string, text:string) => {
    var mailOptions = {
        from:username,
        to,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            log.error(error);
        } else {
            log.info(`Email sent: ${info.response}`)
        }
    })
}