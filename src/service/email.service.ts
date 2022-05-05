import { sendMail } from "../utils/mail.util";

export async function sendUserVerificationMail(to: string, verificationGuid:string) {
    const subject = "Email Address Verification"
    const text = `Uphire user verification mail content here. verificationGUID${verificationGuid}`
    await sendMail(to, subject, text);
}