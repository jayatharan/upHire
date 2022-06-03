import express from "express";
import {
    getAllBiography, 
    createBiography,
    updateBiography,
    getBiography,
    deleteBiography
} from "../controllers/biography.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllBiography
)

router.post(
    "/",
    requiredUser,
    createBiography
)

router.patch(
    "/:id",
    requiredUser,
    updateBiography
)

router.get(
    "/:id",
    requiredUser,
    getBiography
)

router.delete(
    "/:id",
    requiredUser,
    deleteBiography
)

export default router;