import { questions, MCQ, ANSWERKEY } from "../questions.js";

const getRadioInput = (labelText: string, inputValue: string): HTMLDivElement => {
    const div = document.createElement('div');
    const radio = document.createElement('input');
    const label = document.createElement('label');
    div.id = `option-${inputValue}`;
    radio.setAttribute('id', inputValue);
    radio.setAttribute('type', 'radio');
    radio.setAttribute('name', 'option');
    radio.setAttribute('value', inputValue);
    label.setAttribute('for', inputValue);
    label.innerText = ` ${labelText}`;
    div.append(radio,label);
    return div;
}

const getOptions = (questionObj: MCQ): HTMLDivElement => {
    const div = document.createElement('div');
    div.id = 'optionsDiv';
    let options: HTMLDivElement[] = [];
    options.push(getRadioInput(questionObj.A, 'A'));
    options.push(getRadioInput(questionObj.B, 'B'));
    options.push(getRadioInput(questionObj.C, 'C'));
    options.push(getRadioInput(questionObj.D, 'D'));
    options.forEach(option => div.appendChild(option))
    return div;
}

const changeQuestion = (question: Element, index: number) => {
    question!.textContent = questions[index].question;
    document.getElementById('optionsDiv')?.remove();
    const options = getOptions(questions[index]);
    question!.insertAdjacentElement("afterend", options);
}

const getRandomIndex = (uplmt: number): number => {
    return Math.floor(Math.random() * uplmt);
}

export function getAnswers(selectedQuestionsIndex: number[]): ANSWERKEY[] {
    const answers: ANSWERKEY[] = [];
    selectedQuestionsIndex.forEach(index => {
        const q = questions[index];
        const ans: ANSWERKEY= {
            question: q.question,
            answer: q[q.correctOption]
        }
        answers.push(ans);
    });

    return answers;
}

export function showQuestion(selectedQuestions: number[], question = document.querySelector('#optionsContainer .question')! as Element): MCQ {
    let index = getRandomIndex(questions.length);
    while (selectedQuestions.find(value => value == index)) {
        index = getRandomIndex(questions.length);
    }
    selectedQuestions.push(index);
    changeQuestion(question, index);
    return questions[index];
}


export function showQuestionForm(root: HTMLElement, questionForm: string, selectedQuestions: number[]): MCQ {
    root!.innerHTML += questionForm;
    console.log(root.innerHTML);
    const question = document.querySelector("#optionsContainer .question");
    return showQuestion(selectedQuestions, question!);
}

export const checkOption = (selectedOption: Element, shownQuestion: MCQ): boolean => {
    const inputElement = selectedOption as HTMLInputElement;
    return inputElement.value == shownQuestion.correctOption;
}
