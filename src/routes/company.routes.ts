import express from "express";
import {
    getAllCompany, 
    createCompany,
    updateCompany,
    getCompany,
    deleteCompany
} from "../controllers/company.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllCompany
)

router.post(
    "/",
    requiredUser,
    createCompany
)

router.patch(
    "/:id",
    requiredUser,
    updateCompany
)

router.get(
    "/:id",
    requiredUser,
    getCompany
)

router.delete(
    "/:id",
    requiredUser,
    deleteCompany
)

export default router;