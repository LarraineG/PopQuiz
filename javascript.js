// select the elements we need
const start  = document.querySelector('#start-btn');
const render = document.querySelector('#time');
const question = document.querySelector('#question');
const choiceA = document.querySelector('#a');
const choiceB = document.querySelector('#b');
const choiceC = document.querySelector('#c');
let scoreDiv = document.querySelector("#scoreContainer");
let scoreList = document.querySelector("#highscores");
let restart = document.querySelector("#restart");
let highscores = [];
// create quiz questions
const questions = [{
question: "How many hours outside of class do you need to dedicate to Bootcamp?",
choiceA: "3",
choiceB: "40",
choiceC: "7",
answer: "b"
},{
question: "Bootstrap is _______.",
choiceA: "Something for your shoes",
choiceB: "CSS Framework for developing responsive and mobile-first websites.",
choiceC: "Framework that is for only developing Javascript",
answer: "b"
},{
question: "What is NOT acceptable to use to declare a variable?",
choiceA: "var",
choiceB: "let",
choiceC: "far",
answer: "c"
},{
question: "console.log helps you ______",
choiceA: "Generate buttons",
choiceB: "Chage backgrounds",
choiceC: "quietly communicate and log to the console and assists with debugging and tracking your code",
answer: "c"
},{
question: "How many cups of coffee do you drink when coding?",
choiceA: "1",
choiceB: "2",
choiceC: "8 or more",
answer: "c"
},{
question: "What does DOM stand for?",
choiceA: "Document Of Math",
choiceB: "Document Object Model",
choiceC: "Direction Object Model",
answer: "b"
}];
// create variables
let timeLimit = 60;
let begin = 0;
let curQuestion = begin;
//const lastQuestion = questions.length - 1;
const lastQuestion = questions.length;
let TIMER;
start.addEventListener('click', startQuiz);
function startQuiz() {
    score = 0;
        showQuestions();
    startTimer(timeLimit, render);
}
// dynamically load questions
function showQuestions() {
    let q = questions[curQuestion];
    // replace html element values with array values
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
// check answer against array values
function check(answer) {
    if (answer == questions[curQuestion].answer) {
        score++;
    } else {
        timeLeft -= 10;
        //updateTimer(timeLeft);
    }
    count = 0;
    curQuestion++;
    // check if the the last question based on array length otherwise end execution
    if(curQuestion < lastQuestion){
        showQuestions();
    } else {
        // end the execution here
        clearInterval(TIMER);
        showScore();
    }
}
// timer functions
function startTimer(duration, display) {
        console.log('NOTICE: timer started');
    timeLeft = duration;
    resetTimer = setInterval(function () {
        //if ((timeLeft-1) >= 0) {
        if ((timeLeft-1) >= 0) {
            console.log("NOTIC: timer is running");
            clearInterval(render);
            timeLeft--
        } else {
            console.log("NOTIC: times up");
            clearInterval(resetTimer);
            timeLeft = duration;
        }
                updateTimer(timeLeft);
    }, 1000);
}
function updateTimer(t) {
    render.textContent = t;
}
function showScore() {
        // format quiz results
    var scorePct = Math.round(100 * score/questions.length);
        var resp="scored " + score + "/" + questions.length + " (" + scorePct + "%)";
        // return results
    console.log(resp);
    clearInterval(begin);
    var userName = prompt("Enter your initials to store score");
    highscores = JSON.parse(localStorage.getItem("highscores"));
    if (!highscores){
        highscores = [];
    }
    highscores.push({name: userName, score: resp});
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    for (var i = 0;i < highscores.length; i++){
            var player = highscores[i].name + ": " + highscores[i].score;
        var li = document.createElement("li");
        li.textContent = player;
        scoreList.appendChild(li);
    }
    localStorage.setItem("highscores", JSON.stringify(highscores));
}