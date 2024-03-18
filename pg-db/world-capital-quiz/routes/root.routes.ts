import { Router } from "express";

const router = Router();
import { allData } from "../index.js";
import { randomQuestion } from "../utils/randomQuestion.js";
import { CAPITAL } from "../types.js";

export let currentQuestion: CAPITAL;


router.get('/', async (req, res) => {
    currentQuestion = randomQuestion(allData);
    console.log(currentQuestion);
    res.render("index.ejs", { question: currentQuestion });
})

export default router;

export function changeCurrentQuestion() { 
    currentQuestion = randomQuestion(allData); 
    console.log(currentQuestion);
}
