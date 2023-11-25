const questions = document.querySelectorAll('.question');
let currentQuestion = 0;
const answers = [];
const nextButton = document.getElementById('nextQuestion');
const previousButton = document.getElementById('previousQuestion');
const message = document.querySelector('.message');
let isAnswerConfirmed = false;

function showQuestion(questionIndex) {
    message.style.display = 'none';
    questions[currentQuestion].style.display = 'none';
    questions[questionIndex].style.display = 'block';
    currentQuestion = questionIndex;
    message.style.display = 'none';

    if (!isAnswerConfirmed) {
        // При отображении нового вопроса разблокировать все карточки
        const answerCards = questions[currentQuestion].querySelectorAll('.answer-card');
        answerCards.forEach(card => {
            card.classList.remove('disabled');
        });
    }
}

function saveAnswer(answerValue) {
    if (!isAnswerConfirmed) {
        answers[currentQuestion] = answerValue;
        const answerCards = questions[currentQuestion].querySelectorAll('.answer-card');
        answerCards.forEach(card => {
            card.classList.remove('selected');
            card.classList.add('disabled');
        });
        // Отображение выбранного ответа
        const selectedCard = questions[currentQuestion].querySelector(`[data-value="${answerValue}"]`);
        selectedCard.classList.add('selected');
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showResults();
    }
});

previousButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
});

// Обработчик для выбора варианта ответа при клике на карточку
document.addEventListener('click', (event) => {
    if (!isAnswerConfirmed && event.target.classList.contains('answer-card') && !event.target.classList.contains('selected')) {
        const answerValue = event.target.getAttribute('data-value');
        saveAnswer(answerValue);
    }
});

function showMessage(text, className) {
    message.textContent = text;
    message.classList.remove('correct', 'incorrect');
    message.classList.add(className);
    message.style.display = 'block';
}

function showResults() {
    const correctAnswers = ["a", "b" /* Добавьте правильные ответы для каждого вопроса */];
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === correctAnswers[i]) {
            score++;
        }
    }

    alert(`Вы ответили правильно на ${score} из ${questions.length} вопросов.`);
}

showQuestion(0);
