const mainContent = document.querySelector('.main-content');
const vocabulary = {
    "el acondicionador": [
        "conditioner", "hair conditioner", "hair softener", "moisturizing conditioner", 
        "leave-in conditioner", "rinse", "hair treatment", "hair moisturizer"
    ],
    "el cepillo de dientes": [
        "toothbrush", "dental brush", "teeth brush", "brushing tool"
    ],
    "el champú": [
        "shampoo", "hair shampoo", "hair wash", "cleanser", "hair cleaner", "hair soap", 
        "bathing shampoo", "cleansing shampoo"
    ],
    "el desodorante": [
        "deodorant", "antiperspirant", "body deodorant", "roll-on", "spray deodorant", 
        "stick deodorant", "body spray"
    ],
    "el despertador": [
        "alarm clock", "alarm", "wake-up clock", "morning alarm", "bedside alarm", 
        "digital alarm", "clock alarm"
    ],
    "el espejo": [
        "mirror", "looking glass", "reflector", "makeup mirror", "bathroom mirror"
    ],
    "el jabón": [
        "soap", "bar soap", "hand soap", "bath soap", "body soap", "cleaning bar", "soap bar"
    ],
    "el jabón líquido": [
        "liquid soap", "hand soap", "body wash", "liquid hand soap", "gel soap", 
        "bath gel", "shower gel"
    ],
    "el maquillaje": [
        "makeup", "cosmetics", "beauty products", "foundation", "powder", "lipstick", 
        "eye shadow", "concealer", "makeup kit"
    ],
    "la pasta de dientes": [
        "toothpaste", "dental paste", "tooth gel", "tooth cream", "tooth cleaning paste"
    ],
    "el peine": [
        "comb", "hair comb", "pocket comb", "fine-tooth comb", "wide-tooth comb", 
        "hair styling comb"
    ],
    "la ropa": [
        "clothes", "clothing", "outfit", "attire", "garments", "wardrobe", "apparel", 
        "dress", "clothes set", "wardrobe items"
    ],
    "la secadora de pelo": [
        "hair dryer", "blow dryer", "hair blower", "hair drier", "dryer", 
        "electric hair dryer", "hot air dryer"
    ],
    "la toalla": [
        "towel", "bath towel", "hand towel", "washcloth", "beach towel", 
        "face towel", "drying towel"
    ],

    "afeitar": [
        "to shave", "to do shaving", "to cut facial hair", "to trim", "to groom"
    ],
    "afeitarse": [
        "to shave oneself", "to shave", "to get a shave", "to remove hair", "to shave one's face"
    ],

    "acostar": [
        "to put to bed", "to lay down", "to put someone to sleep", "to help to bed"
    ],
    "acostarse": [
        "to go to bed", "to lie down", "to go to sleep", "to turn in", "to hit the bed", 
        "to get into bed", "to rest", "to lie down to sleep"
    ],

    "bañar": [
        "to bathe", "to give a bath", "to wash", "to clean", "to soak"
    ],
    "bañarse": [
        "to bathe oneself", "to take a bath", "to wash oneself", "to soak oneself", 
        "to have a bath", "to get clean", "to freshen up"
    ],

    "cepillar": [
        "to brush", "to scrub", "to sweep lightly", "to polish"
    ],
    "cepillarse": [
        "to brush oneself", "to brush one's hair", "to do one's hair", "to comb hair", 
        "to tidy hair"
    ],
    "cepillarse los dientes": [
        "to brush one's teeth", "to clean one's teeth", "to brush the teeth", "to do dental brushing"
    ],

    "despertar": [
        "to wake up", "to rouse", "to awaken", "to stir", "to bring to wakefulness"
    ],
    "despertarse": [
        "to wake oneself", "to wake up", "to get up", "to open one's eyes", "to stop sleeping"
    ],

    "duchar": [
        "to give a shower", "to shower someone", "to wash", "to bathe quickly"
    ],
    "ducharse": [
        "to shower oneself", "to take a shower", "to wash up", "to get clean", "to have a shower"
    ],

    "gastar": [
        "to spend", "to waste", "to use up", "to consume", "to deplete", "to burn through"
    ],

    "lavar": [
        "to wash", "to clean", "to rinse", "to scrub", "to cleanse"
    ],
    "lavarse los dientes": [
        "to wash one's teeth", "to brush one's teeth", "to clean one's teeth", 
        "to do dental cleaning"
    ],

    "levantar": [
        "to lift", "to raise", "to get up", "to pick up", "to elevate", "to hoist"
    ],
    "levantarse": [
        "to get oneself up", "to get up", "to rise", "to stand up", "to wake up", 
        "to get out of bed"
    ],

    "maquillar": [
        "to put on makeup", "to apply makeup", "to do makeup", "to decorate the face"
    ],
    "maquillarse": [
        "to put makeup on oneself", "to do one's makeup", "to apply cosmetics", 
        "to put on beauty products", "to get made up"
    ],

    "mirar": [
        "to look", "to watch", "to glance", "to observe", "to gaze", "to see", 
        "to take a look", "to look at"
    ],
    "mirarse": [
        "to look at oneself", "to see oneself in the mirror", "to check oneself", 
        "to glance at oneself"
    ],

    "peinar": [
        "to comb", "to style hair", "to brush hair", "to tidy hair", "to smooth hair"
    ],
    "peinarse": [
        "to comb one's hair", "to style one's hair", "to brush one's hair", 
        "to fix one's hair", "to groom oneself"
    ],

    "ponerse la ropa": [
        "to put on clothes", "to get dressed", "to dress oneself", "to put clothing on", 
        "to wear clothes", "to change into clothes"
    ],

    "quitar": [
        "to take off", "to remove", "to strip", "to pull off", "to get rid of"
    ],
    "quitarse": [
        "to take off oneself", "to remove one's clothing", "to undress", "to take something off", 
        "to get undressed"
    ],

    "secar": [
        "to dry", "to wipe dry", "to air dry", "to make dry", "to remove moisture"
    ],
    "secarse": [
        "to dry oneself", "to get dry", "to towel off", "to dry off", "to become dry"
    ],
    "secarse el pelo": [
        "to dry one's hair", "to blow-dry one's hair", "to towel-dry hair", 
        "to dry off hair", "to remove moisture from hair"
    ],

    "vestir": [
        "to dress", "to clothe", "to attire", "to put on clothing", "to wear"
    ],
    "vestirse": [
        "to dress oneself", "to get dressed", "to put on clothes", "to change clothes", 
        "to clothe oneself", "to get ready", "to dress up"
    ],
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
    english.textContent = ' — ' + vocabulary[key].join(', ');

    entry.appendChild(spanish);
    entry.appendChild(english);
    container.appendChild(entry);
}

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
            
            status.innerText = "Status: ❌";
            incorrect.push(current_vocab_word);
            for (let i = 0; i < vocabulary[current_vocab_word].length; i++) { // Check if it matches
                if (val.toLowerCase() == vocabulary[current_vocab_word][i]) {
                    status.innerText = "Status: ✅";
                    correct.push(current_vocab_word);
                    incorrect.pop();
                }
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
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${correct.length}/${keys.length}</h3>
                </div>
            `;
        } else {
            mainContent.innerHTML = `
                <h1>La Prueba de Vocabulario</h1>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${current_vocab_word.slice(0, 1).toUpperCase() + current_vocab_word.slice(1)}</h3>
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
