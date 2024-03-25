import { Router } from "express";
import { getIndexPage } from "../controllers/get/app.controller.js";

const router = Router();

router.get('/', getIndexPage);

export default router;
