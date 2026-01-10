// ============================================
// QUIZ DATA - Contemporary Philippine Arts from the Regions
// ============================================
// Questions are now organized by subject in separate files
// Edit each subject's questions in the 'questions' folder

const quizData = {
    subject1: [],
    subject2: [],
    subject3: [],
    subject4: [],
};

// ============================================
// STATE MANAGEMENT
// ============================================
let currentUser = null;
let currentSubject = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let maxStreak = 0;
let selectedAnswer = null;
let userTextAnswer = '';

// ============================================
// DOM ELEMENTS
// ============================================
const loginScreen = document.getElementById('loginScreen');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const userInfo = document.getElementById('userInfo');
const userEmail = document.getElementById('userEmail');
const btnLogout = document.getElementById('btnLogout');
const subjectCards = document.querySelectorAll('.subject-card');
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');
const btnRetry = document.getElementById('btnRetry');
const btnHome = document.getElementById('btnHome');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const answersGrid = document.getElementById('answersGrid');
const totalScoreEl = document.getElementById('totalScore');
const streakEl = document.getElementById('streak');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    setupEventListeners();
    updateStats();
    updateAllSubjectCounts();
});

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Logout button
    btnLogout.addEventListener('click', handleLogout);

    // Subject card selection
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            startQuiz(subject);
        });
    });

    // Navigation buttons
    btnBack.addEventListener('click', goBackToHome);
    btnNext.addEventListener('click', nextQuestion);
    btnRetry.addEventListener('click', retryQuiz);
    btnHome.addEventListener('click', goBackToHome);
}

// ============================================
// LOGIN SYSTEM
// ============================================
function checkLoginStatus() {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
        currentUser = savedUser;
        showMainApp();
    } else {
        showLoginScreen();
    }
}

function handleLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    // Validate Gmail
    if (!email.endsWith('@gmail.com')) {
        alert('⚠️ Please enter a valid Gmail address (must end with @gmail.com)');
        return;
    }

    // Save user to localStorage
    localStorage.setItem('quizUser', email);
    currentUser = email;

    // Load user's scores
    loadUserScores();

    // Show main app
    showMainApp();
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Save current scores before logout
        saveUserScores();

        // Clear current user
        localStorage.removeItem('quizUser');
        currentUser = null;

        // Reset scores
        score = 0;
        streak = 0;
        maxStreak = 0;
        updateStats();

        // Show login screen
        showLoginScreen();
    }
}

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    userInfo.style.display = 'none';
    emailInput.value = '';
}

function showMainApp() {
    loginScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    userInfo.style.display = 'flex';
    userEmail.textContent = currentUser;
}

function loadUserScores() {
    const savedScores = localStorage.getItem(`scores_${currentUser}`);
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        score = scores.totalScore || 0;
        maxStreak = scores.maxStreak || 0;
        updateStats();
    }
}

function saveUserScores() {
    if (currentUser) {
        localStorage.setItem(`scores_${currentUser}`, JSON.stringify({
            totalScore: score,
            maxStreak: maxStreak,
            lastUpdated: new Date().toISOString()
        }));
    }
}

function updateAllSubjectCounts() {
    Object.keys(quizData).forEach(subject => {
        const count = quizData[subject].length;
        const countEl = document.getElementById(`count-${subject}`);
        if (countEl) {
            countEl.textContent = `${count} question${count !== 1 ? 's' : ''}`;
        }
    });
}

// ============================================
// QUIZ FLOW
// ============================================
function startQuiz(subject) {
    currentSubject = subject;
    const subjectQuestions = quizData[subject] || [];

    if (subjectQuestions.length === 0) {
        alert('No questions available for this subject yet. Please add questions in the questions folder!');
        return;
    }

    // Shuffle and select questions (use all if 10 or fewer, otherwise random 10)
    const numQuestions = Math.min(subjectQuestions.length, 50);
    currentQuestions = [...subjectQuestions].sort(() => Math.random() - 0.5).slice(0, numQuestions);
    currentQuestionIndex = 0;

    // Show quiz screen
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');

    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    selectedAnswer = null;
    userTextAnswer = '';

    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;

    // Update question
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
    questionText.textContent = question.question;

    // Clear answers grid
    answersGrid.innerHTML = '';

    // Check question type based on presence of answers array
    if (question.type === 'text' || !question.answers || question.answers.length === 0) {
        // TEXT INPUT for DEF and ENUM
        createTextInput();
    } else {
        // BUTTONS for MC and FITB
        createAnswerButtons(question);
    }

    // Disable next button
    btnNext.classList.add('disabled');
}

function createAnswerButtons(question) {
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index, button));
        answersGrid.appendChild(button);
    });
}

function createTextInput() {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'text-input-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-answer-input';
    input.placeholder = 'Type your answer here...';
    input.id = 'textAnswerInput';

    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-answer-btn';
    submitBtn.textContent = 'Submit Answer';
    submitBtn.addEventListener('click', () => submitTextAnswer());

    // Allow Enter key to submit
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitTextAnswer();
        }
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(submitBtn);
    answersGrid.appendChild(inputContainer);

    // Focus the input
    setTimeout(() => input.focus(), 100);
}

function selectAnswer(answerIndex, button) {
    if (selectedAnswer !== null) return; // Already answered

    selectedAnswer = answerIndex;
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === question.correct;

    // Disable all buttons
    const allButtons = answersGrid.querySelectorAll('.answer-btn');
    allButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === question.correct) {
            btn.classList.add('correct');
        } else if (idx === answerIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // Update score and streak
    if (isCorrect) {
        score++;
        streak++;
        if (streak > maxStreak) {
            maxStreak = streak;
        }
        createConfetti(button);
    } else {
        streak = 0;
    }

    updateStats();

    // Enable next button
    btnNext.classList.remove('disabled');
}

function submitTextAnswer() {
    const input = document.getElementById('textAnswerInput');
    if (!input || selectedAnswer !== null) return;

    const userAnswer = input.value.trim();
    if (!userAnswer) {
        alert('Please type your answer!');
        return;
    }

    selectedAnswer = 'text'; // Mark as answered
    userTextAnswer = userAnswer;

    const question = currentQuestions[currentQuestionIndex];
    const correctAnswer = question.correctText || '';

    // Case-insensitive comparison
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    // Disable input and button
    input.disabled = true;
    const submitBtn = answersGrid.querySelector('.submit-answer-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = isCorrect ? 'text-feedback correct' : 'text-feedback wrong';
    feedback.innerHTML = isCorrect
        ? `✓ Correct!`
        : `✗ Wrong! Correct answer: <strong>${correctAnswer}</strong>`;
    answersGrid.querySelector('.text-input-container').appendChild(feedback);

    // Add visual feedback to input
    input.classList.add(isCorrect ? 'correct-input' : 'wrong-input');

    // Update score and streak
    if (isCorrect) {
        score++;
        streak++;
        if (streak > maxStreak) {
            maxStreak = streak;
        }
        createConfetti(input);
    } else {
        streak = 0;
    }

    updateStats();
    btnNext.classList.remove('disabled');
}

function nextQuestion() {
    if (selectedAnswer === null) return;

    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');

    const percentage = Math.round((score / currentQuestions.length) * 100);
    const wrongAnswers = currentQuestions.length - score;

    // Update results
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('finalStreak').textContent = maxStreak;

    // Animate score ring
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;

    setTimeout(() => {
        const scoreRingFill = document.getElementById('scoreRingFill');
        scoreRingFill.style.strokeDashoffset = offset;
    }, 100);

    // Update results title based on score
    const resultsTitle = document.getElementById('resultsTitle');
    if (percentage >= 90) {
        resultsTitle.textContent = 'Outstanding! 🌟';
    } else if (percentage >= 70) {
        resultsTitle.textContent = 'Great Job! 👏';
    } else if (percentage >= 50) {
        resultsTitle.textContent = 'Good Effort! 💪';
    } else {
        resultsTitle.textContent = 'Keep Practicing! 📚';
    }

    // Save user scores
    saveUserScores();
}

function retryQuiz() {
    score = 0;
    streak = 0;
    maxStreak = 0;
    updateStats();
    startQuiz(currentSubject);
}

function goBackToHome() {
    welcomeScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');

    // Reset quiz state
    score = 0;
    streak = 0;
    maxStreak = 0;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    updateStats();
}

// ============================================
// UI UPDATES
// ============================================
function updateStats() {
    totalScoreEl.textContent = score;
    streakEl.textContent = `${streak}🔥`;
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#8A4BFF', '#FF4B9C', '#4BFFD9', '#FFD94B'];

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = `${rect.left + rect.width / 2}px`;
        confetti.style.top = `${rect.top + rect.height / 2}px`;
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.transition = 'all 1s ease-out';

        document.body.appendChild(confetti);

        // Animate
        setTimeout(() => {
            const angle = (Math.random() * Math.PI * 2);
            const distance = 50 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = '0';
        }, 10);

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}

// ============================================
// SVG GRADIENT FOR SCORE RING
// ============================================
const svgNS = "http://www.w3.org/2000/svg";
const defs = document.createElementNS(svgNS, "defs");
const gradient = document.createElementNS(svgNS, "linearGradient");
gradient.setAttribute("id", "scoreGradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "100%");

const stop1 = document.createElementNS(svgNS, "stop");
stop1.setAttribute("offset", "0%");
stop1.setAttribute("stop-color", "hsl(270, 70%, 60%)");

const stop2 = document.createElementNS(svgNS, "stop");
stop2.setAttribute("offset", "50%");
stop2.setAttribute("stop-color", "hsl(320, 85%, 65%)");

const stop3 = document.createElementNS(svgNS, "stop");
stop3.setAttribute("offset", "100%");
stop3.setAttribute("stop-color", "hsl(190, 90%, 60%)");

gradient.appendChild(stop1);
gradient.appendChild(stop2);
gradient.appendChild(stop3);
defs.appendChild(gradient);

const scoreRing = document.querySelector('.score-ring');
if (scoreRing) {
    scoreRing.insertBefore(defs, scoreRing.firstChild);
}
