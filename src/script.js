const questions = document.querySelectorAll('.question');
let currentQuestion = 0;
const answers = [];
const confirmButton = document.getElementById('confirmAnswer');
const nextButton = document.getElementById('nextQuestion');
const message = document.querySelector('.message');
let isAnswerConfirmed = false;

function showQuestion(questionIndex) {
    message.style.display = 'none';
    questions[currentQuestion].style.display = 'none';
    questions[questionIndex].style.display = 'block';
    currentQuestion = questionIndex;
    message.style.display = 'none';

    // При отображении нового вопроса разблокировать все карточки
    const answerCards = questions[currentQuestion].querySelectorAll('.answer-card');
    answerCards.forEach(card => {
        card.classList.remove('disabled');
    });

    isAnswerConfirmed = false; // Сброс подтверждения ответа при переходе к новому вопросу
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

confirmButton.addEventListener('click', () => {
    if (!isAnswerConfirmed) {
        if (answers[currentQuestion]) {
            const correctAnswers = ["a", "b", "c", "d", "a" /* Добавьте правильные ответы для каждого вопроса */];
            const userAnswer = answers[currentQuestion];
            if (userAnswer === correctAnswers[currentQuestion]) {
                showMessage("ВЕРНО", "correct");
            } else {
                showMessage("НЕВЕРНО", "incorrect");
            }
            isAnswerConfirmed = true; // Заблокировать изменение ответа после подтверждения
        } else {
            alert('Пожалуйста, выберите вариант ответа.');
        }
    }
});

nextButton.addEventListener('click', () => {
    if (isAnswerConfirmed) {
        if (currentQuestion < questions.length - 1) {
            showQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
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
    const correctAnswers = ["a", "b", "c", "d", "a" /* Добавьте правильные ответы для каждого вопроса */];
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === correctAnswers[i]) {
            score++;
        }
    }

    alert(`Вы ответили правильно на ${score} из ${questions.length} вопросов.`);
}

showQuestion(0);
