import express from "express";
import { emailSubscribe } from "../controller/userSubscriptionController.js";

const router = express.Router();

router.post("/subscribe", emailSubscribe);

export default router;
