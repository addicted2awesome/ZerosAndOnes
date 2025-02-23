const tarotCards = [
    {
        name: "The Fool",
        meaning: "New beginnings, innocence, spontaneity",
        reversedMeaning: "Recklessness, risk-taking, foolish decisions"
    },
    {
        name: "The Magician",
        meaning: "Manifestation, resourcefulness, power",
        reversedMeaning: "Manipulation, poor planning, untapped talents"
    },
    {
        name: "The High Priestess",
        meaning: "Intuition, mystery, inner knowledge",
        reversedMeaning: "Secrets, disconnection from intuition, information withheld"
    },
    {
        name: "The Empress",
        meaning: "Fertility, nurturing, abundance",
        reversedMeaning: "Creative block, dependence, emptiness"
    },
    {
        name: "The Emperor",
        meaning: "Authority, structure, leadership",
        reversedMeaning: "Domination, excessive control, lack of discipline"
    },
    {
        name: "The Hierophant",
        meaning: "Tradition, conformity, belief systems",
        reversedMeaning: "Challenge to beliefs, unconventionality, rebellion"
    },
    {
        name: "The Lovers",
        meaning: "Love, harmony, relationships, choices",
        reversedMeaning: "Disharmony, imbalance, misalignment of values"
    },
    {
        name: "The Chariot",
        meaning: "Direction, control, willpower",
        reversedMeaning: "Lack of control, aggression, obstacles"
    },
    {
        name: "Strength",
        meaning: "Courage, patience, compassion",
        reversedMeaning: "Self-doubt, weakness, lack of self-discipline"
    },
    {
        name: "The Hermit",
        meaning: "Soul-searching, introspection, inner guidance",
        reversedMeaning: "Isolation, loneliness, withdrawal"
    },
    {
        name: "Wheel of Fortune",
        meaning: "Change, cycles, inevitable fate",
        reversedMeaning: "Bad luck, resistance to change, breaking cycles"
    },
    {
        name: "Justice",
        meaning: "Justice, fairness, truth",
        reversedMeaning: "Unfairness, dishonesty, lack of accountability"
    },
    {
        name: "The Hanged Man",
        meaning: "Surrender, letting go, new perspective",
        reversedMeaning: "Stalling, needless sacrifice, fear of sacrifice"
    },
    {
        name: "Death",
        meaning: "Endings, change, transformation",
        reversedMeaning: "Resistance to change, stagnation, decay"
    },
    {
        name: "Temperance",
        meaning: "Balance, moderation, patience",
        reversedMeaning: "Imbalance, excess, lack of harmony"
    },
    {
        name: "The Devil",
        meaning: "Bondage, materialism, addiction",
        reversedMeaning: "Release, breaking free, power reclaimed"
    },
    {
        name: "The Tower",
        meaning: "Sudden change, upheaval, revelation",
        reversedMeaning: "Fear of change, avoiding disaster, delaying the inevitable"
    },
    {
        name: "The Star",
        meaning: "Hope, inspiration, generosity",
        reversedMeaning: "Lack of faith, despair, disconnection"
    },
    {
        name: "The Moon",
        meaning: "Illusion, fear, anxiety",
        reversedMeaning: "Release of fear, unhealthy patterns, confusion"
    },
    {
        name: "The Sun",
        meaning: "Joy, success, celebration",
        reversedMeaning: "Temporary depression, lack of success"
    },
    {
        name: "Judgement",
        meaning: "Rebirth, inner calling, absolution",
        reversedMeaning: "Self-doubt, refusal of self-examination"
    },
    {
        name: "The World",
        meaning: "Completion, integration, accomplishment",
        reversedMeaning: "Lack of completion, stagnation"
    }
];

const positions = [
    "Past: This card represents influences from the past that are affecting your current situation.",
    "Present: This card illuminates your current circumstances and immediate challenges.",
    "Future: This card suggests potential outcomes and future developments."
];

let drawnCards = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawCards() {
    const shuffledDeck = shuffleArray([...tarotCards]);
    drawnCards = shuffledDeck.slice(0, 3).map(card => ({
        ...card,
        isReversed: Math.random() < 0.5
    }));
    return drawnCards;
}

function interpretSpread(question, cards) {
    let interpretation = `<p class="question-echo">Your Question: "${question}"</p><br>`;
    
    cards.forEach((card, index) => {
        interpretation += `
            <div class="card-interpretation">
                <h3>${positions[index].split(':')[0]}</h3>
                <p><strong>${card.name}${card.isReversed ? ' (Reversed)' : ''}</strong></p>
                <p>${positions[index].split(':')[1]}</p>
                <p>${card.isReversed ? card.reversedMeaning : card.meaning}</p>
            </div><br>
        `;
    });

    return interpretation;
}

document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawCards');
    const questionInput = document.getElementById('question');
    const interpretationDiv = document.getElementById('interpretation');
    const cards = document.querySelectorAll('.card');

    drawButton.addEventListener('click', () => {
        const question = questionInput.value.trim();
        if (!question) {
            alert('Please enter a question or scenario for the reading.');
            return;
        }

        // Reset cards
        cards.forEach(card => card.classList.remove('flipped'));
        
        // Draw new cards
        const drawnCards = drawCards();

        // Flip cards one by one with interpretation
        cards.forEach((cardElement, index) => {
            setTimeout(() => {
                const cardFront = cardElement.querySelector('.card-front');
                cardFront.textContent = `${drawnCards[index].name}${drawnCards[index].isReversed ? ' (Reversed)' : ''}`;
                cardElement.classList.add('flipped');

                // Show interpretation after all cards are flipped
                if (index === cards.length - 1) {
                    setTimeout(() => {
                        interpretationDiv.innerHTML = interpretSpread(question, drawnCards);
                    }, 1000);
                }
            }, index * 1000);
        });
    });
});
