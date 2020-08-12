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
question: "How many times do you exercise per week?",
choiceA: "0-1",
choiceB: "2-4",
choiceC: "5 or more",
answer: "b"
},{
question: "How long do you exercise?",
choiceA: "30 min",
choiceB: "1 hour",
choiceC: "more than 1 hour",
answer: "b"
},{
question: "How long can you hold plank?",
choiceA: "under 30s",
choiceB: "1 min",
choiceC: "more than 90s",
answer: "c"
},{
question: "How many pushups can you do in a row?",
choiceA: "0-1",
choiceB: "2-8",
choiceC: "10 or more",
answer: "c"
},{
question: "How much water do you drink a day",
choiceA: "I prefer wine",
choiceB: "1-3",
choiceC: "8 or more",
answer: "c"
},{
question: "What type of food do you eat?",
choiceA: "all processed",
choiceB: "80/20",
choiceC: "mainly fruits and veggies",
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