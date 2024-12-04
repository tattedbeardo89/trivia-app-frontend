document.addEventListener('DOMContentLoaded', function () {
    let currentQuestion = 0;
    let score = 0;
    let quizData = [];

    // Fetch quiz data from the Flask backend
    fetch('/quiz_data')  // Assuming your backend is serving quiz data at this route
        .then(response => response.json())
        .then(data => {
            quizData = data;
            loadQuestion(currentQuestion);
        })
        .catch(error => console.error('Error fetching quiz data:', error));

    // Load the current question and options
    function loadQuestion(questionIndex) {
        const questionData = quizData[questionIndex];
        document.getElementById("question").textContent = questionData.question;

        const options = questionData.options;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";  // Clear previous options

        options.forEach((option, index) => {
            const optionId = `option${index + 1}`;
            const label = document.createElement("label");
            label.setAttribute("for", optionId);
            label.textContent = option;

            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "option";
            radioButton.value = option;
            radioButton.id = optionId;

            optionsContainer.appendChild(radioButton);
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement("br"));
        });
    }

    // Handle the submit button click event
    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert("Please select an option before submitting.");
            return;
        }

        const selectedAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].answer;

        if (selectedAnswer === correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion(currentQuestion);
        } else {
            document.getElementById("score").textContent = `Quiz Complete! Your score: ${score} / ${quizData.length}`;
            document.getElementById("submit-btn").disabled = true;  // Disable submit button after quiz ends
        }
    });
});
