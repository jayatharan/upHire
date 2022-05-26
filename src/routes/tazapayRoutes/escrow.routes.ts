import express from 'express';
import {
    createTazapayEscrow,
    getTazapayEscrowStatus,
    getTazapayEscrowSummary
} from "../../controller/tazapay.controller";

const router = express.Router();

router.post(
    "/",
    createTazapayEscrow
)

router.get(
    "/:id",
    getTazapayEscrowStatus
)

router.get(
    "/:id/summary",
    getTazapayEscrowSummary
)

export default router;