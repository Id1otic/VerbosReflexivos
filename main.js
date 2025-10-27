const mainContent = document.querySelector('.main-content');
const vocabulary = {
    "el acondicionador": "conditioner",
    "el cepillo de dientes": "toothbrush",
    "el champú": "shampoo",
    "el desodorante": "deodorant",
    "el despertador": "alarm clock",
    "el espejo": "mirror",
    "el jabón": "soap",
    "el jabón líquido": "liquid soap",
    "el maquillaje": "makeup",
    "la pasta de dientes": "toothpaste",
    "el peine": "comb",
    "la ropa": "clothes",
    "la secadora de pelo": "hair dryer",
    "la toalla": "towel",
    "afeitar": "to shave",
    "afeitarse": "to shave oneself",
    "acostar": "to put to bed",
    "acostarse": "to go to bed",
    "bañar": "to bathe",
    "bañarse": "to take a bath",
    "cepillar": "to brush",
    "cepillarse": "to brush oneself",
    "cepillarse los dientes": "to brush one's teeth",
    "despertar": "to wake",
    "despertarse": "to wake up",
    "duchar": "to shower",
    "ducharse": "to take a shower",
    "gastar": "to spend",
    "lavar": "to wash",
    "lavarse los dientes": "to brush one's teeth",
    "levantar": "to lift",
    "levantarse": "to get up",
    "maquillar": "to put on makeup",
    "maquillarse": "to do one's makeup",
    "mirar": "to look",
    "mirarse": "to look at oneself",
    "peinar": "to comb",
    "peinarse": "to comb one's hair",
    "ponerse la ropa": "to put on clothes",
    "quitar": "to remove",
    "quitarse": "to take off",
    "secar": "to dry",
    "secarse": "to dry oneself",
    "secarse el pelo": "to dry one's hair",
    "vestir": "to dress",
    "vestirse": "to get dressed"
};

function looselyMatches(input, correctAnswer) {
    // Step 1: normalize case, spacing
    input = input.toLowerCase().trim();
    correctAnswer = correctAnswer.toLowerCase().trim();

    // Step 2: normalize pronouns & reflexives
    const replacements = [
        ["oneself", "themselves"],
        ["themself", "themselves"],
        ["one's", "their"],
        ["ones", "their"],
        ["self", "themselves"],
        ["myself", "themselves"],
        ["yourself", "themselves"],
        ["himself", "themselves"],
        ["herself", "themselves"],
        ["theirself", "themselves"],
        ["the ", ""],
        ["a ", ""],
        ["to ", ""],
        ["  ", " "]
    ];
    for (let [from, to] of replacements) {
        input = input.replaceAll(from, to);
        correctAnswer = correctAnswer.replaceAll(from, to);
    }

    // Step 3: remove punctuation
    input = input.replace(/[^\w\s]/g, "");
    correctAnswer = correctAnswer.replace(/[^\w\s]/g, "");

    // Step 4: handle simple plurals
    function normalizeWord(word) {
        if (word.endsWith("ies")) return word.slice(0, -3) + "y";
        if (word.endsWith("ves")) return word.slice(0, -3) + "f";
        if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
        return word;
    }

    const inputWords = input.split(/\s+/).map(normalizeWord);
    const correctWords = correctAnswer.split(/\s+/).map(normalizeWord);

    // Step 5: overlap ratio ignoring word order
    let matches = 0;
    for (let word of correctWords) {
        if (inputWords.includes(word)) matches++;
    }
    const ratio = matches / correctWords.length;

    // Step 6: reflexive-verb handling
    const reflexiveVerbs = [
        "wash", "bathe", "dry", "dress", "shave", "shower", "wake", "look", "call", "prepare"
    ];
    for (let verb of reflexiveVerbs) {
        // if both contain the verb and any reflexive pronoun form
        const reflexiveForms = ["themselves", "themself", "oneself", "self"];
        if (
            input.includes(verb) &&
            correctAnswer.includes(verb) &&
            reflexiveForms.some(r => input.includes(r) || correctAnswer.includes(r))
        ) {
            return true;
        }
    }

    // Step 7: known equivalent phrase groups
    const equivalents = [
        ["brush teeth", "brush their teeth"],
        ["dry hair", "dry their hair"],
        ["wake up", "get up"],
        ["go to bed", "lie down"],
        ["get dressed", "dress themselves"],
        ["wash face", "wash their face"],
        ["wash hands", "wash their hands"],
        ["bathe", "take a bath"],
        ["shower", "take a shower"]
    ];
    for (let [a, b] of equivalents) {
        if (
            (input.includes(a) && correctAnswer.includes(b)) ||
            (input.includes(b) && correctAnswer.includes(a))
        ) {
            return true;
        }
    }

    // Step 8: allow 75% or higher word overlap
    return ratio >= 0.75;
}

let correct = [];
let incorrect = [];
let current_vocab_word = null;

const keys = Object.keys(vocabulary);
const container = document.querySelector('.vocab-container');
for (let key of keys) {
    const entry = document.createElement('div');
    entry.classList.add('vocab-entry');

    const spanish = document.createElement('strong');
    spanish.textContent = key;

    const english = document.createElement('span');
    english.textContent = ' — ' + vocabulary[key];

    entry.appendChild(spanish);
    entry.appendChild(english);
    container.appendChild(entry);
}

const ETCheckbox = document.getElementById('english-terms-checkbox');
let ETChecked;
ETCheckbox.addEventListener('change', function() {
    if (this.checked) {
        ETChecked = true
    } else {
        ETChecked = false
    }
});

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkInput() {
    const nextButton = document.getElementById('next');
    const checkButton = document.getElementById('check');
    const status = document.getElementById('status');
    const input = document.getElementById('answer-input') || -1;

    if (input !== -1) { // Make sure it exists before doing anything
        const val = input.value; // Input vale

        if (val.length > 0) { // Make sure it is not empty
            nextButton.disabled = false;
            checkButton.disabled = true;
            
            const correctAnswer = ETChecked ? current_vocab_word : vocabulary[current_vocab_word];
            if (looselyMatches(val, correctAnswer)) {
                status.innerText = "Status: ✅";
                correct.push(current_vocab_word);
                incorrect.pop();
            } else {
                status.innerText = "Status: ❌";
                incorrect.push(current_vocab_word);
            }
        }
    }
}

function nextQuestion() {
    fadeOut(mainContent, () => { // Transion
        current_vocab_word = keys[randomInt(0, keys.length - 1)];
        while (correct.includes(current_vocab_word) || incorrect.includes(current_vocab_word)) { // Make sure doesn't repeat terms
            if (correct.length + incorrect.length == keys.length) {
                break; // Exit when no more vocab terms
            }
            current_vocab_word = keys[randomInt(0, keys.length - 1)];
        }
        
        if (correct.length + incorrect.length == keys.length) {
            mainContent.innerHTML = `
                <h1>Puntos/Resultados</h1>
                <h3>You scored <strong>${correct.length}</strong> out of <strong>${keys.length}</strong>!</h3>
                <p><strong>Correct terms:</strong> ${correct.join(", ")}.</p>
                <p><strong>Incorrect terms:</strong> ${incorrect.join(", ")}.</p>
            `;
        } else {
            let fixed_word = ETChecked
                ? vocabulary[current_vocab_word].slice(0, 1).toUpperCase() + vocabulary[current_vocab_word].slice(1)
                : current_vocab_word.slice(0, 1).toUpperCase() + current_vocab_word.slice(1);
            
            mainContent.innerHTML = `
                <h1>La Prueba de Vocabulario</h1>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${fixed_word}</h3>
                    <h3 id="status">Status: ❓</h3>
                </div>            
                <input type="text" placeholder="Answer/Translation" id="answer-input">
                <div style="display:flex; gap:0px; justify-content:center;">
                    <button class="button" id="check" onclick="checkInput()" type="button">Check</button>
                    <button class="button" id="next" onclick="nextQuestion()" type="button" disabled>Next Question</button>
                </div>
            `;
        }

        fadeIn(mainContent); // Transition
    });
}

// Functions for transitions
function fadeOut(element, callback) {
    let opacity = 1;

    const fade = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(fade);
            element.style.display = 'none';
            if (callback) callback(); // run something after fade-out
        } else {
            opacity -= 0.05;
            element.style.opacity = opacity;
        }
    }, 20);
}

function fadeIn(element) {
    let opacity = 0;
    element.style.opacity = 0;
    element.style.display = 'block';

    const fade = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fade);
        } else {
            opacity += 0.05;
            element.style.opacity = opacity;
        }
    }, 20);
}
