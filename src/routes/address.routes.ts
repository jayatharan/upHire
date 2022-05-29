import express from "express";
import {
    createAddress,
    patchAddress,
    deleteAddress
} from "../controller/address.controller"
import { requiredUser } from "../middleware";

const router = express.Router();

router.post(
    "/",
    requiredUser,
    createAddress
)

router.patch(
    "/:id",
    patchAddress
)

router.delete(
    "/:id",
    deleteAddress
)

export default router;