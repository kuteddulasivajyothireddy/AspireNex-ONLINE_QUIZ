let quizzes = [];
let currentQuiz = null;
let currentAnswers = {};

document.getElementById('create-quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('quiz-title').value;
    const questionText = document.getElementById('quiz-question').value;
    const choicesText = document.getElementById('quiz-choices').value;
    const correctAnswer = document.getElementById('quiz-answer').value;

    const choices = choicesText.split(',');

    const question = {
        questionText,
        choices,
        correctAnswer
    };

    if (!currentQuiz) {
        currentQuiz = {
            title,
            questions: []
        };
        quizzes.push(currentQuiz);
    }

    currentQuiz.questions.push(question);

    document.getElementById('create-quiz-form').reset();
    displayQuizzes();
});

document.getElementById('save-quiz').addEventListener('click', function() {
    currentQuiz = null;
    displayQuizzes();
});

function displayQuizzes() {
    const quizzesList = document.getElementById('quizzes');
    quizzesList.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.textContent = quiz.title;
        li.addEventListener('click', function() {
            takeQuiz(index);
        });
        quizzesList.appendChild(li);
    });
}

function takeQuiz(quizIndex) {
    currentQuiz = quizzes[quizIndex];
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = '';

    currentQuiz.questions.forEach((question, questionIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionTitle = document.createElement('p');
        questionTitle.textContent = question.questionText;
        questionDiv.appendChild(questionTitle);

        question.choices.forEach((choice, choiceIndex) => {
            const choiceLabel = document.createElement('label');
            const choiceInput = document.createElement('input');
            choiceInput.type = 'radio';
            choiceInput.name = `question-${questionIndex}`;
            choiceInput.value = choice;
            choiceInput.addEventListener('change', function() {
                currentAnswers[questionIndex] = choice;
            });
            choiceLabel.appendChild(choiceInput);
            choiceLabel.appendChild(document.createTextNode(choice));
            questionDiv.appendChild(choiceLabel);
        });

        quizContent.appendChild(questionDiv);
    });

    document.getElementById('quiz-taking').style.display = 'block';
    document.getElementById('submit-quiz').style.display = 'block';
}

document.getElementById('submit-quiz').addEventListener('click', function() {
    let score = 0;

    currentQuiz.questions.forEach((question, index) => {
        if (currentAnswers[index] === question.correctAnswer) {
            score++;
        }
    });

    document.getElementById('score').textContent = `You scored ${score} out of ${currentQuiz.questions.length}`;
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-taking').style.display = 'none';
    document.getElementById('submit-quiz').style.display = 'none';
});