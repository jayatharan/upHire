import express from "express";
import {
  createTazapayUser,
  getTazapayUserById
} from "../../controller/tazapay.controller"

const router = express.Router();

router.post(
  "/",
  createTazapayUser
)

router.get(
  "/:id",
  getTazapayUserById
)

export default router;