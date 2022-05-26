import express from 'express';
import {
    createTazapayBank,
    getTazapayBankList
} from "../../controller/tazapay.controller"

const router = express.Router();

router.post(
    "/",
    createTazapayBank
)

router.get(
    "/:id",
    getTazapayBankList
)

export default router;