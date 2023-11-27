// Axel Cotón Gutiérrez Copyright 2023
let currentQuestionIndex = 0;

// Variables para gestionar la dificultad y el rango
let difficulty = "easy"; // Valor predeterminado
let maxNumber = 10;

// Escucha el evento de cambio en los radios de selección de dificultad
const difficultyButtons = document.getElementsByName("difficulty");
for (const difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener("change", function () {
        difficulty = this.value;
        if (difficulty === "easy") {
            maxNumber = 10;
        } else if (difficulty === "medium") {
            maxNumber = 25;
        } else if (difficulty === "high") {
            maxNumber = 50;
        } else if (difficulty === "vhigh") {
            maxNumber = 100;
        }
        displayQuestion();
    });
}

// Función para generar una pregunta en función de la dificultad
function generateQuestion() {
    const number = Math.floor(Math.random() * maxNumber) + 1;
    const question = `¿Cómo se dice ${number}.º en números ordinales?`;
    const answer = toOrdinal(number);

    return {
        question: question,
        options: generateOptions(answer),
        answer: answer
    };
}

function generateOptions(answer) {
    const options = [answer];
    while (options.length < 4) {
        const randomOption = generateRandomOrdinal();
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return shuffleArray(options);
}

function generateRandomOrdinal() {
    const randomNum = Math.floor(Math.random() * maxNumber) + 1;
    return toOrdinal(randomNum);
}


function toOrdinal(number) {
    if (number === 1) {
        return 'primero';
    } else if (number === 2) {
        return 'segundo';
    } else if (number === 3) {
        return 'tercero';
    } else if (number === 4) {
        return 'cuarto';
    } else if (number === 5) {
        return 'quinto';
    } else if (number === 6) {
        return 'sexto';
    } else if (number === 7) {
        return 'séptimo';
    } else if (number === 8) {
        return 'octavo';
    } else if (number === 9) {
        return 'noveno';
    } else if (number >= 11 && number <= 19) {
        const units = number % 10;

        const specialNames = {
            11: 'undécimo',
            12: 'duodécimo',
            13: 'decimotercero',
            14: 'decimocuarto',
            15: 'decimoquinto',
            16: 'decimosexto',
            17: 'decimoséptimo',
            18: 'decimooctavo',
            19: 'decimonoveno'
        };

        return specialNames[number];
    } else {
        const tens = Math.floor(number / 10) * 10;
        const units = number % 10;

        const tensName = {
            10: 'décimo',
            20: 'vigésimo',
            30: 'trigésimo',
            40: 'cuadragésimo',
            50: 'quincuagésimo',
            60: 'sexagésimo',
            70: 'septuagésimo',
            80: 'octogésimo',
            90: 'nonagésimo'
        }[tens];

        const unitsName = units > 0 ? ' ' + toOrdinal(units) : '';

        return tensName + unitsName;
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    const currentQuestion = generateQuestion();
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("options-container"); // Agrega la clase aquí
        button.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    const resultContainer = document.getElementById("result");

    if (selectedOption === correctAnswer) {
        resultContainer.textContent = "¡Respuesta Correcta!";
        resultContainer.style.color = "green";
    } else {
        resultContainer.textContent = "Respuesta Incorrecta. La respuesta correcta es " + correctAnswer + ".";
        resultContainer.style.color = "red";
    }

    // Resto del código...
}

function nextQuestion() {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = ""; // Limpiar el mensaje de resultado al pasar a la siguiente pregunta

    displayQuestion();
}


// Inicia el juego al cargar la página
window.onload = displayQuestion;
