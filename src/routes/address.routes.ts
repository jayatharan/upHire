import express from "express";
import {
    getAllAddress, 
    createAddress,
    updateAddress,
    getAddress,
    deleteAddress
} from "../controllers/address.controller";
import { 
    requiredUser 
} from "../middleware";

const router = express.Router();

router.get(
    "/",
    requiredUser,
    getAllAddress
)

router.post(
    "/",
    requiredUser,
    createAddress
)

router.patch(
    "/:id",
    requiredUser,
    updateAddress
)

router.get(
    "/:id",
    requiredUser,
    getAddress
)

router.delete(
    "/:id",
    requiredUser,
    deleteAddress
)

export default router;