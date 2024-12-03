
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const department = document.getElementById("department").value;

    if (username && department) {
        document.querySelector(".login-container").style.display = "none";
        document.querySelector(".app").style.display = "block";
        startQuiz();  // Start the quiz after successful login
    } else {
        alert("Please enter both Username and Department");
    }
});

// Quiz JavaScript Code
const questions = [
    {
        question: "Which of these is not a feature of Java?",
        answer: [
            { text: "object-oriented", correct: false },
            { text: "Compiled", correct: true },
            { text: "platform independent", correct: false },
            { text: "Interpreted language", correct: false },
        ]
    },
    {
        question: "Which component of Java is responsible for running the compiled Java bytecode?",
        answer: [
            { text: "JVM", correct: true },
            { text: "JDK", correct: false },
            { text: "JRE", correct: false },
            { text: "JIT", correct: false },
        ]
    },
     {
        question:"Which is the purpose of the path environment variable in java?",
        answer:[
            {text:"To optimize java code",correct:false},
            {text:"To locate java libraries",correct:false},
            {text:"To store java bytecode",correct:false},
            {text:"To locate the java compiler",correct:true},
        ]  
    },
    {
        question:"Which feature of java makes it possible to run a java program on different platforms?",
        answer:[
            {text:"Object-oriented",correct:false},
            {text:"Platform-independent",correct:true},
            {text:"Syntax",correct:false},
            {text:"Memory management",correct:false},
        ]
    },
    {
        question:"In java ,how should class names be written?",
        answer:[
            {text:"kebab-case",correct:false},
            {text:"CamelCase",correct:false},
            {text:"Snake_case",correct:false},
            {text:"PascalCase",correct:true},
        ]  
    },
    {
        question:"What is the default value of a path boolean variable in java?",
        answer:[
            {text:"true",correct:false},
            {text:"0",correct:false},
            {text:"false",correct:true},
            {text:"null",correct:false},
        ]  
    },
    {
        question:"What  is the result of this operation in java : (int)(7.9)?",
        answer:[
            {text:"Syntax Error",correct:false},
            {text:"7",correct:true},
            {text:"7.9",correct:false},
            {text:"8",correct:false},
        ]  
    },
    {
        question:"Which keyword is  used  to define a constant variable in java?",
        answer:[
            {text:"immutable",correct:false},
            {text:"static",correct:false},
            {text:"const",correct:false},
            {text:"final",correct:true},
        ]  
    },
    {
        question:"What  is the range of the  short data type in java ?",
        answer:[
            {text:"-32768 to 32768",correct:false},
            {text:"0 to 3567",correct:false},
            {text:"-128 to 127",correct:false},
            {text:"-32768 to 32767",correct:true},
        ]  
    },
    {
        question:"Which  of  the following is Not one of 3Vs of Big data?",
        answer:[
            {text:"volume",correct:false},
            {text:"velocity",correct:true},
            {text:"variety",correct:false},
            {text:"validation",correct:false},
        ]  
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
