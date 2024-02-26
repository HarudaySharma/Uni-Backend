export { }
import { ANSWERKEY, MCQ } from "./questions.js";
import { checkOption, getAnswers, showQuestion, showQuestionForm } from "./utils/utils.js";

const root = document.getElementById("root");
const startBtn = document.getElementById("startBtn");

const questionForm = `\
    <form id="optionsContainer">\
    <h2 class="question"></h2>\
    <!-- options-->\
    <div id="optionStatus" class='hidden'></div>\
    <button type="button" id="submitBtn">SUBMIT</button>\
    <button type="button" id="nextBtn" class='hidden'>NEXT</button>\
    </form>`


const selectedQuestionsIndex: number[] = [];
let answerKey: ANSWERKEY[] = [];
let score = 0;

startBtn!.addEventListener('click', (e) => {
    e.preventDefault();
    startBtn!.remove();
    let shownQuestion = showQuestionForm(root!, questionForm, selectedQuestionsIndex);

    const submitBtn = document.querySelector("#submitBtn");
    submitBtn!.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedOption = document.querySelector(`input[type="radio"][name='option']:checked`);
        if(!selectedOption) {
            window.alert('please select an option');
            return;
        }
        submitBtn!.classList.toggle('hidden');
        const statusDiv = document.getElementById('optionStatus');
        if(checkOption(selectedOption, shownQuestion)) {
            statusDiv!.innerText = 'Correct';
            statusDiv!.classList.remove('red');
            statusDiv?.classList.add('green');
            score++;
        }
        else {
            statusDiv!.innerText = `Incorrect`;
            statusDiv!.classList.remove('green');
            statusDiv?.classList.add('red');
        }
        statusDiv!.classList.toggle('hidden');
        const nextBtn = document.getElementById('nextBtn');
        nextBtn!.classList.toggle('hidden');
    })

    const nextBtn = document.getElementById('nextBtn');
    nextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn!.classList.toggle('hidden');
        const statusDiv = document.getElementById('optionStatus');
        statusDiv!.classList.toggle('hidden');
        statusDiv!.innerText = '';

        if(selectedQuestionsIndex.length == 10) {
            answerKey = getAnswers(selectedQuestionsIndex);
            const ul = document.createElement('ul');
            const restartBtn = document.createElement('button');
            const h2 = document.createElement('h2');
            h2.innerText = 'Answer Key';
            document.getElementById('heading')!.innerText = `Score: ${score}`;
            answerKey.forEach((obj) => {
                const li = document.createElement('li');
                li.innerHTML = `${obj.question} - <span class='green'>${obj.answer}</span>`;
                ul.append(li);
            })
            restartBtn.setAttribute('type', 'button');
            restartBtn.id = 'restartBtn';
            restartBtn.innerText = "RESTART";
            restartBtn!.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.reload();
            })
            root!.innerHTML = '';
            root!.append(h2, ul, restartBtn);
            root?.classList.add('center');
            return;
        }
        nextBtn!.classList.toggle('hidden');
        shownQuestion = showQuestion(selectedQuestionsIndex);
    })
})

