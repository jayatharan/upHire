import express from "express";
import {
    getAllEducationalDetail, 
    createEducationalDetail,
    updateEducationalDetail,
    getEducationalDetail,
    deleteEducationalDetail
} from "../controllers/educationalDetail.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllEducationalDetail
)

router.post(
    "/",
    requiredUser,
    createEducationalDetail
)

router.patch(
    "/:id",
    requiredUser,
    updateEducationalDetail
)

router.get(
    "/:id",
    requiredUser,
    getEducationalDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteEducationalDetail
)

export default router;