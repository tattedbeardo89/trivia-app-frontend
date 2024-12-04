const apiUrl = "https://trivia-flask-app.onrender.com";  // Backend URL

let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

document.addEventListener('DOMContentLoaded', fetchQuizData);

function fetchQuizData() {
    fetch(`${apiUrl}/quiz_data`)  // Fetch quiz data from your backend
        .then(response => response.json())
        .then(data => {
            quizData = data;
            loadQuestion();
        })
        .catch(error => {
            console.error("Error fetching quiz data:", error);
            alert("Error fetching quiz data. Please try again.");
        });
}

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];

    // Update question text
    document.getElementById("question").textContent = questionData.question;

    // Update the options
    const options = questionData.options;
    for (let i = 0; i < options.length; i++) {
        document.getElementById(`label${i+1}`).textContent = options[i];
    }
}

// Handle the submit button
document.getElementById("submit-btn").addEventListener("click", checkAnswer);

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    const answer = selectedOption.nextElementSibling.textContent;
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (answer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById("score").textContent = `Quiz Complete! Your score: ${score} / ${quizData.length}`;
        document.getElementById("submit-btn").disabled = true;
    }
}
