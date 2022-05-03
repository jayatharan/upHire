import express from "express";
import { patchProjectDetail, deleteProjectDetail } from "../controller/projectDetail.controller";
import { requiredUser } from "../middleware";

const router = express.Router();

router.patch(
    "/:id",
    requiredUser,
    patchProjectDetail
)

router.delete(
    "/:id",
    requiredUser,
    deleteProjectDetail
)

export default router;