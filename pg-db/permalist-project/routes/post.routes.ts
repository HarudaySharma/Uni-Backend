import { Router } from "express";
import { addTodo, deleteTodo, editTodo } from "../controllers/post/app.controller.js";

const router = Router();

router.post('/add', addTodo);
router.post('/edit', editTodo);
router.post('/delete', deleteTodo);

export default router;
