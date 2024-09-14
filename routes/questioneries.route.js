import { Router } from "express";
import { createQuetions } from "../controllers/quetioneries.controller.js";
const router = Router();

router.route("/createQue/:queId").post(createQuetions);

export default router;