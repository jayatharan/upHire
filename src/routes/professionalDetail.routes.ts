import express from "express";
import {
    getAllProfessionalDetail, 
    createProfessionalDetail,
    updateProfessionalDetail,
    getProfessionalDetail,
    deleteProfessionalDetail
} from "../controllers/professionalDetail.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllProfessionalDetail
)

router.post(
    "/",
    requiredUser,
    createProfessionalDetail
)

router.patch(
    "/:id",
    requiredUser,
    updateProfessionalDetail
)

router.get(
    "/:id",
    requiredUser,
    getProfessionalDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteProfessionalDetail
)

export default router;