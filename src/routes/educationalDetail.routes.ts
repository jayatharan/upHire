import express from "express";
import { patchEducationalDetail, deleteEducationalDetail } from "../controller/educationalDetail.controller";
import { requiredUser } from "../middleware";

const router = express.Router();

router.patch(
    "/:id",
    requiredUser,
    patchEducationalDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteEducationalDetail
)

export default router;