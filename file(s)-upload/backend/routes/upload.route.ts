import { Router } from "express";
import upload from "../middlewares/fileUpload.js";
import { fileUpload } from "../controllers/fileUpload.controller.js";

const router = Router();

router.post('/', upload.fields([{name: 'gallery'}]), fileUpload);

export default router;
