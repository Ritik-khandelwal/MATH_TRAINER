let typesofcalculation = ["add", "sub", "mul", "div"];
let total_number_of_questions = 5;
let questionsAnswered = 0;
let ending_range = 10;
const delay = 300;

function startQuiz() {
    if (questionsAnswered < total_number_of_questions) {
        generateQuestion();
    } else {
        console.log("Quiz completed!");
    }
}

// function to generate questions

function generateQuestion() {
    let randomIndex = Math.floor(Math.random() * typesofcalculation.length);
    let currentCalculation = typesofcalculation[randomIndex];

    if(currentCalculation == "add") add();
    else if(currentCalculation == "sub") sub();
    else if(currentCalculation == "mul") mul();
    else div();
}

// addition function

function add() {
    let firstnumber = Math.floor(Math.random() * ending_range + 1);
    let secondnumber = Math.floor(Math.random() * ending_range + 1);
    let actual_sum = firstnumber + secondnumber;

    const question = document.querySelector(".question");
    question.innerHTML = `${firstnumber} + ${secondnumber}`;

    const user_answer = document.querySelector("#calculated");
    user_answer.value = "";
    user_answer.style.color = "";

    const listener = () => {
        if (user_answer.value == actual_sum) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);
            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// subtraction function

function sub() {
    let firstnumber = Math.floor(Math.random() * ending_range + 1);
    let secondnumber = Math.floor(Math.random() * ending_range + 1);
    let actual_sub = firstnumber - secondnumber;

    const question = document.querySelector(".question");
    question.innerHTML = `${firstnumber} - ${secondnumber}`;

    const user_answer = document.querySelector("#calculated");
    user_answer.value = "";
    user_answer.style.color = "";

    const listener = () => {
        if (user_answer.value == actual_sub) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);
            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// multiplication function

function mul() {
    let firstnumber = Math.floor(Math.random() * ending_range + 1);
    let secondnumber = Math.floor(Math.random() * ending_range + 1);
    let actual_mul = firstnumber * secondnumber;

    const question = document.querySelector(".question");
    question.innerHTML = `${firstnumber} * ${secondnumber}`;

    const user_answer = document.querySelector("#calculated");
    user_answer.value = "";
    user_answer.style.color = "";

    const listener = () => {
        if (user_answer.value == actual_mul) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);
            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// division function

function div() {
    let firstnumber = Math.floor(Math.random() * ending_range + 1);
    let secondnumber = Math.floor(Math.random() * ending_range + 1);
    let actual_div = (firstnumber / secondnumber).toFixed(2);

    const question = document.querySelector(".question");
    question.innerHTML = `${firstnumber} / ${secondnumber}`;

    const user_answer = document.querySelector("#calculated");
    user_answer.value = "";
    user_answer.style.color = "";

    const listener = () => {
        if (parseFloat(user_answer.value).toFixed(2) == actual_div) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);
            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

startQuiz();