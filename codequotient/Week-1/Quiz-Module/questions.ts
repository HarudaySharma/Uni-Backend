export interface ANSWERKEY {
    question: string,
    answer: string,
}

export interface MCQ {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    correctOption: 'A'| 'B' | 'C' | 'D',
}


export const questions: MCQ[] = [
    {
        "question": "Which country won the FIFA World Cup in 2018?",
        "A": "France",
        "B": "Germany",
        "C": "Brazil",
        "D": "Argentina",
        "correctOption": "A"

    },
    {
        "question": "Who is the all-time leading goal scorer in FIFA World Cup history?",
        "A": "Pele",
        "B": "Lionel Messi",
        "C": "Cristiano Ronaldo",
        "D": "Miroslav Klose",
        "correctOption": "D"

    },
    {
        "question": "In which year did England win the FIFA World Cup?",
        "A": "1966",
        "B": "1974",
        "C": "1982",
        "D": "1990",
        "correctOption": "A"

    },
    {
        "question": "Who is known as the 'Hand of God' for his controversial goal in the 1986 World Cup?",
        "A": "Diego Maradona",
        "B": "Pele",
        "C": "Zinedine Zidane",
        "D": "Ronaldinho",
        "correctOption": "A"

    },
    {
        "question": "Which club has won the most UEFA Champions League titles?",
        "A": "Real Madrid",
        "B": "Barcelona",
        "C": "Bayern Munich",
        "D": "AC Milan",
        "correctOption": "A"

    },
    {
        "question": "Who is the top scorer in the history of the English Premier League?",
        "A": "Alan Shearer",
        "B": "Thierry Henry",
        "C": "Wayne Rooney",
        "D": "Andy Cole",
        "correctOption": "A"

    },
    {
        "question": "Which player has won the FIFA Ballon d'Or the most times?",
        "A": "Lionel Messi",
        "B": "Cristiano Ronaldo",
        "C": "Pele",
        "D": "Diego Maradona",
        "correctOption": "A"

    },
    {
        "question": "In which country did the first official international football match take place?",
        "A": "England",
        "B": "Brazil",
        "C": "Uruguay",
        "D": "Germany",
        "correctOption": "C"

    },
    {
        "question": "Who is the manager of Liverpool FC as of 2024?",
        "A": "Jurgen Klopp",
        "B": "Pep Guardiola",
        "C": "Zinedine Zidane",
        "D": "Carlo Ancelotti",
        "correctOption": "A"

    },
    {
        "question": "Which player holds the record for the most goals in a single Premier League season?",
        "A": "Alan Shearer",
        "B": "Luis Suarez",
        "C": "Thierry Henry",
        "D": "Mohamed Salah",
        "correctOption": "A"

    },
    {
        "question": "In which country is the famous football club Barcelona located?",
        "A": "Italy",
        "B": "Germany",
        "C": "Spain",
        "D": "England",
        "correctOption": "C"

    },
    {
        "question": "Which player is often referred to as 'CR7'?",
        "A": "Cristiano Ronaldo",
        "B": "Cesc Fabregas",
        "C": "Carlos Tevez",
        "D": "Ciro Immobile",
        "correctOption": "A"

    },
]
