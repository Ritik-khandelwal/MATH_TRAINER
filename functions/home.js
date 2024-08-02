let typesofcalculation = ["add"];
let total_number_of_questions = 5;
let questionsAnswered = 0;
let ending_range = 5;
const delay = 300;
let total_time = 0;
let average_time = 0;
let startTime;

// Function to retrieve user input values

function getUserSettings() {
    // Get selected types of calculation
    let typesOfCalculation = Array.from(document.querySelectorAll('input[name="calculation"]:checked')).map(el => el.value);
    let totalNumberOfQuestions = parseInt(document.getElementById('total_number_of_questions').value, 10);
    let endingRange = parseInt(document.getElementById('ending_range').value, 10);

    return { typesOfCalculation, totalNumberOfQuestions, endingRange };
}

// Event listener to apply settings

document.getElementById('apply_settings').addEventListener('click', () => {
    let selectedTypes = Array.from(document.querySelectorAll('input[name="calculation"]:checked')).map(cb => cb.value);
    
    // Ensure at least one checkbox is checked
    if (selectedTypes.length === 0) {
        document.querySelector('input[name="calculation"][value="add"]').checked = true;
        selectedTypes = ["add"];
        alert("At least one type of calculation must be selected. Defaulting to 'add'.");
    }
    
    typesofcalculation = selectedTypes;
    total_number_of_questions = parseInt(document.getElementById('total_number_of_questions').value, 10);
    ending_range = parseInt(document.getElementById('ending_range').value, 10);

    // Save values to localStorage
    localStorage.setItem('calculationTypes', JSON.stringify(typesofcalculation));
    localStorage.setItem('totalNumberOfQuestions', total_number_of_questions);
    localStorage.setItem('endingRange', ending_range);
    
    // Reset counters and start the quiz with new settings
    questionsAnswered = 0;
    total_time = 0;
    
    // Auto focus on the answer input
    document.getElementById('calculated').focus();
    
    startQuiz();
});

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve and set stored values if they exist
    const storedCalculationTypes = JSON.parse(localStorage.getItem('calculationTypes'));
    const storedTotalQuestions = localStorage.getItem('totalNumberOfQuestions');
    const storedEndingRange = localStorage.getItem('endingRange');

    // Set default values if no values are found in local storage
    typesofcalculation = storedCalculationTypes || ["add"];
    total_number_of_questions = storedTotalQuestions ? parseInt(storedTotalQuestions, 10) : 5;
    ending_range = storedEndingRange ? parseInt(storedEndingRange, 10) : 5;

    // Apply these settings to the input fields and checkboxes
    document.getElementById('total_number_of_questions').value = total_number_of_questions;
    document.getElementById('ending_range').value = ending_range;

    // Set stored checkbox values
    typesofcalculation.forEach(type => {
        document.querySelector(`input[name="calculation"][value="${type}"]`).checked = true;
    });

    // Add event listeners to save values on change
    document.getElementById('total_number_of_questions').addEventListener('input', (event) => {
        localStorage.setItem('totalNumberOfQuestions', event.target.value);
    });

    document.getElementById('ending_range').addEventListener('input', (event) => {
        localStorage.setItem('endingRange', event.target.value);
    });

    document.querySelectorAll('input[name="calculation"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedTypes = Array.from(document.querySelectorAll('input[name="calculation"]:checked')).map(cb => cb.value);
            localStorage.setItem('calculationTypes', JSON.stringify(selectedTypes));
        });
    });
});

function startQuiz() {
    if (questionsAnswered < total_number_of_questions) {
        generateQuestion();
    } else {
        console.log("Quiz completed! Total Time: " + (total_time / 1000) + " seconds");
        let total_time_field = document.querySelector(".total_time");
        total_time_field.innerHTML = `Total Time: ${(total_time / 1000).toFixed(2)} sec`;

        average_time = total_time / total_number_of_questions;

        let average_time_field = document.querySelector(".average_time");
        average_time_field.innerHTML = `Average Time: ${(average_time / 1000).toFixed(2)} sec`;
    }
}

// Function to generate questions

function generateQuestion() {
    startTime = performance.now(); // Start the timer when a question is generated
    let randomIndex = Math.floor(Math.random() * typesofcalculation.length);
    let currentCalculation = typesofcalculation[randomIndex];

    if (currentCalculation == "add") add();
    else if (currentCalculation == "sub") sub();
    else if (currentCalculation == "mul") mul();
    else div();
}

// Addition function

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
        if (parseInt(user_answer.value) == actual_sum) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);

            let endTime = performance.now();
            let time_taken = endTime - startTime;
            console.log("Time Taken: " + time_taken);
            total_time += time_taken;

            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// Subtraction function

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
        if (parseInt(user_answer.value) == actual_sub) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);

            let endTime = performance.now();
            let time_taken = endTime - startTime;
            console.log("Time Taken: " + time_taken);
            total_time += time_taken;

            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// Multiplication function

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
        if (parseInt(user_answer.value) == actual_mul) {
            user_answer.style.color = "#4C7F4D";
            questionsAnswered++;
            console.log("Correct answer! Questions answered: " + questionsAnswered);

            let endTime = performance.now();
            let time_taken = endTime - startTime;
            console.log("Time Taken: " + time_taken);
            total_time += time_taken;

            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

// Division function

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

            let endTime = performance.now();
            let time_taken = endTime - startTime;
            console.log("Time Taken: " + time_taken);
            total_time += time_taken;

            user_answer.removeEventListener('input', listener);
            setTimeout(startQuiz, delay); // Call startQuiz to generate the next question
        }
    };

    user_answer.addEventListener('input', listener);
}

startQuiz();
