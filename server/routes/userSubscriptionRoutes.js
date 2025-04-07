import express from "express";
import {
  emailSubscribe,
  emailUnSubscribe,
} from "../controller/userSubscriptionController.js";

const router = express.Router();

router.post("/subscribe", emailSubscribe);

router.post("/unsubscribe", emailUnSubscribe);

export default router;
