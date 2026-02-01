// Quiz configuration
const quizQuestions = [
    {
        id: 1,
        question: "Where is your property located?",
        subtitle: "The Boiler Upgrade Scheme is available in England and Wales",
        type: "single",
        options: [
            { value: "england", label: "England" },
            { value: "wales", label: "Wales" },
            { value: "scotland", label: "Scotland" },
            { value: "northern-ireland", label: "Northern Ireland" }
        ]
    },
    {
        id: 2,
        question: "Do you own your property?",
        subtitle: "The grant is available to homeowners and private landlords",
        type: "single",
        options: [
            { value: "yes-owner", label: "Yes, I'm the homeowner" },
            { value: "yes-landlord", label: "Yes, I'm a private landlord" },
            { value: "no", label: "No, I'm a tenant" }
        ]
    },
    {
        id: 3,
        question: "What type of heating system do you currently have?",
        subtitle: "You need to be replacing a fossil fuel system to qualify",
        type: "single",
        options: [
            { value: "gas", label: "Gas boiler" },
            { value: "oil", label: "Oil boiler" },
            { value: "lpg", label: "LPG boiler" },
            { value: "electric", label: "Electric heating" },
            { value: "heat-pump", label: "Already have a heat pump" },
            { value: "other", label: "Other" }
        ]
    },
    {
        id: 4,
        question: "What type of property do you have?",
        subtitle: "This helps us understand your heating requirements",
        type: "single",
        options: [
            { value: "detached", label: "Detached house" },
            { value: "semi-detached", label: "Semi-detached house" },
            { value: "terraced", label: "Terraced house" },
            { value: "bungalow", label: "Bungalow" },
            { value: "flat", label: "Flat/Apartment" }
        ]
    },
    {
        id: 5,
        question: "How many bedrooms does your property have?",
        subtitle: "This helps estimate the system size you'll need",
        type: "single",
        options: [
            { value: "1-2", label: "1-2 bedrooms" },
            { value: "3", label: "3 bedrooms" },
            { value: "4", label: "4 bedrooms" },
            { value: "5+", label: "5+ bedrooms" }
        ]
    },
    {
        id: 6,
        question: "Do you have a valid Energy Performance Certificate (EPC)?",
        subtitle: "An EPC less than 10 years old is required for the grant",
        type: "single",
        options: [
            { value: "yes", label: "Yes, and it's less than 10 years old" },
            { value: "yes-old", label: "Yes, but it's more than 10 years old" },
            { value: "no", label: "No, I don't have one" },
            { value: "unsure", label: "I'm not sure" }
        ]
    },
    {
        id: 7,
        question: "When would you like to install your heat pump?",
        subtitle: "This helps installers prioritize your enquiry",
        type: "single",
        options: [
            { value: "asap", label: "As soon as possible" },
            { value: "1-3-months", label: "Within 1-3 months" },
            { value: "3-6-months", label: "Within 3-6 months" },
            { value: "6-12-months", label: "Within 6-12 months" },
            { value: "just-researching", label: "Just researching for now" }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = {};

function startQuiz() {
    document.querySelector('.hero-section').style.display = 'none';
    document.querySelector('.benefits-section').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    let optionsHtml = '';
    question.options.forEach(option => {
        const isSelected = quizAnswers[question.id] === option.value ? 'selected' : '';
        optionsHtml += `
            <button class="option-button ${isSelected}" onclick="selectOption(${question.id}, '${option.value}', this)">
                ${option.label}
            </button>
        `;
    });
    
    const buttonsHtml = `
        <div class="quiz-buttons">
            ${currentQuestion > 0 ? '<button class="btn-back" onclick="previousQuestion()">← Back</button>' : ''}
            <button class="btn-next" id="nextBtn" onclick="nextQuestion()" ${!quizAnswers[question.id] ? 'disabled' : ''}>
                ${currentQuestion === quizQuestions.length - 1 ? 'See Results →' : 'Next →'}
            </button>
        </div>
    `;
    
    document.getElementById('quizContent').innerHTML = `
        <h2 class="question-title">${question.question}</h2>
        <p class="question-subtitle">${question.subtitle}</p>
        <div class="options-grid">
            ${optionsHtml}
        </div>
        ${buttonsHtml}
    `;
}

function selectOption(questionId, value, button) {
    button.parentElement.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    quizAnswers[questionId] = value;
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
        window.scrollTo({ top: document.getElementById('quizSection').offsetTop - 20, behavior: 'smooth' });
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showResults() {
    const isEligible = checkEligibility();
    
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (isEligible) {
        document.getElementById('resultsIcon').textContent = '✅';
        document.getElementById('resultsTitle').textContent = 'Great News!';
        document.getElementById('resultsMessage').textContent = 'Based on your answers, you appear to be eligible for the Boiler Upgrade Scheme grant of up to £7,500!';
    } else {
        document.getElementById('resultsIcon').textContent = '⚠️';
        document.getElementById('resultsTitle').textContent = 'Almost There!';
        document.getElementById('resultsMessage').textContent = 'Based on your answers, you may need to take some additional steps to qualify. Our installers can help you understand your options and find the best solution for your home.';
        document.querySelector('.results-grant-box').innerHTML = `
            <div class="grant-amount">Expert Help</div>
            <div class="grant-label">Available to Guide You</div>
        `;
    }
}

function checkEligibility() {
    if (!['england', 'wales'].includes(quizAnswers[1])) {
        return false;
    }
    
    if (quizAnswers[2] === 'no') {
        return false;
    }
    
    if (quizAnswers[3] === 'heat-pump') {
        return false;
    }
    
    return true;
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = leadForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Submitting...';
            submitButton.disabled = true;
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                postcode: document.getElementById('postcode').value,
                consent: document.getElementById('consent').checked,
                quizAnswers: quizAnswers,
                timestamp: new Date().toISOString(),
                source: 'heat-pump-grant-checker'
            };
            
            try {
                const response = await fetch('/api/submit-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok && data.success) {
                    document.getElementById('resultsSection').style.display = 'none';
                    document.getElementById('thankYouSection').style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'conversion', {
                            'event_category': 'Lead',
                            'event_label': 'Heat Pump Lead Submitted'
                        });
                    }
                } else {
                    alert(data.error || 'There was an error submitting your information. Please try again.');
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your information. Please try again.');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
});
