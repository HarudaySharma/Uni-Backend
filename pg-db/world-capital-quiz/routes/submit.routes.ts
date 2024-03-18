import { Router } from "express";
import { changeCurrentQuestion, currentQuestion } from "./root.routes.js";

const router = Router();
let totalCorrect = 0;

router.post('/', (req, res) => {
    const { answer } = req.body as {answer: string};
    let isCorrect = false;
    if (currentQuestion.capital.toLowerCase() === answer.trim().toLowerCase()) {
        totalCorrect += 1;
        isCorrect = true;
    }
    changeCurrentQuestion();
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
    });
})

export default router;
