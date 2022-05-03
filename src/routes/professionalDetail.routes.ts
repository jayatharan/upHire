import express from "express";
import { patchProfessionalDetail, deleteProfessionalDetail } from "../controller/professionalDetail.controller";
import { requiredUser } from "../middleware";

const router = express.Router();

router.patch(
    "/:id",
    requiredUser,
    patchProfessionalDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteProfessionalDetail
)

export default router;