import express from "express";
import {
  createTazapayUser,
  getTazapayUserById,
  updateTazapayUser
} from "../../controller/tazapay.controller";

const router = express.Router();

router.post(
  "/",
  createTazapayUser
)

router.put(
  "/",
  updateTazapayUser
)

router.get(
  "/:id",
  getTazapayUserById
)

export default router;