import express from "express";
import user from "./user.routes";
import escrow from "./escrow.routes";
import bank from "./bank.routes";

const router = express.Router();

router.use("/user", user);
router.use("/escrow", escrow);
router.use("/bank", bank)

export default router;