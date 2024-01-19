// Sample questions
const questions = [
    { text: 'How satisfied are you with our products?', type: 'rating' },
    { text: 'How fair are the prices compared to similar retailers?', type: 'rating' },
    { text: 'How satisfied are you with the value for money of your purchase?', type: 'rating' },
    { text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating' },
    { text: 'What could we do to improve our service?', type: 'text' }
];

let currentQuestionIndex = 0;
let answers = [];

function startSurvey() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('survey-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.text;

    if (question.type === 'rating') {
        document.getElementById('rating-container').style.display = 'block';
        document.getElementById('text-container').style.display = 'none';
    } else {
        document.getElementById('rating-container').style.display = 'none';
        document.getElementById('text-container').style.display = 'block';
    }

    document.getElementById('progress').innerText = `${currentQuestionIndex + 1}/${questions.length}`;
}

function nextQuestion() {
    saveAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showThankYouScreen();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        saveAnswer();
        currentQuestionIndex--;
        showQuestion();
    }
}

function skipQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showThankYouScreen();
    }
}

function saveAnswer() {
    const question = questions[currentQuestionIndex];
    const answer = (question.type === 'rating') ? document.getElementById('rating').value : document.getElementById('textAnswer').value;
    answers.push({ question: question.text, answer: answer });
}

function submitSurvey() {
    if (confirm('Are you sure you want to submit the survey?')) {
        // Save answers in the database or local storage
        console.log('Survey submitted:', answers);

        // Set a flag as 'COMPLETED' in the database or local storage
        // (You can handle this part based on your backend requirements)

        // Show thank you screen
        showThankYouScreen();
    }
}

function showThankYouScreen() {
    document.getElementById('survey-screen').style.display = 'none';
    document.getElementById('thank-you-screen').style.display = 'block';

    // Redirect to welcome screen after 5 seconds
    setTimeout(() => {
        resetSurvey();
        document.getElementById('thank-you-screen').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'block';
    }, 5000);
}

function resetSurvey() {
    currentQuestionIndex = 0;
    answers = [];
}
