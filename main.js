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
    "afeitarse": "to shave",
    "acostarse": "to go to bed",
    "bañarse": "to bathe",
    "cepillar": "to brush",
    "cepillarse": "to brush oneself",
    "cepillarse los dientes": "to brush one's teeth",
    "despertar": "to wake",
    "despertarse": "to wake oneself up",
    "duchar": "to shower",
    "ducharse": "to take a shower",
    "gastar": "to spend",
    "lavar": "to wash",
    "lavarse los dientes": "to wash one's teeth",
    "levantarse": "to get up",
    "maquillar": "to put on makeup",
    "maquillarse": "to do one's makeup",
    "mirar": "to look",
    "mirarse": "to look at oneself",
    "peinar": "to comb",
    "peinarse": "to comb one's hair",
    "ponerse la ropa": "to put on clothes",
    "quitarse": "to take off",
    "secar": "to dry",
    "secarse": "to dry oneself",
    "secarse el pelo": "to dry one's hair",
    "vestirse": "to get dressed"
};

const nGrams = (value, n = 3) => {
  const pad = " ".repeat(n - 1);
  value = pad + value + pad;
  return Array(value.length - n + 1)
    .fill("")
    .map((_, index) => value.slice(index, index + n));
};

const nGramSimilarity = (stringA, stringB, n = 3) => {
  if (stringA === stringB) return 1;
  const a = new Set(nGrams(stringA, n));
  const b = new Set(nGrams(stringB, n));
  const common = new Set([...a].filter(x => b.has(x)));
  const total = new Set([...a, ...b]);
  return common.size / (total.size || Infinity);
};

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
            console.log(`Accuracy: ${nGramSimilarity(val, correctAnswer) * 100}%`)
            if (nGramSimilarity(val, correctAnswer) >= 0.5) {
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
