const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

const cardData = [
    { id: 1, text: "Singleton", definition: "Un design pattern qui garantit qu'une classe n'a qu'une seule instance" },
    { id: 2, text: "getInstance()", definition: "Une méthode qui retourne l'instance unique de la classe" },
    { id: 3, text: "private Constructor", definition: "Empêche la création d'instances supplémentaires en dehors de la classe" },
    { id: 4, text: "Thread Safety", definition: "Assure que l'instance est correctement initialisée dans un environnement multithread" }
];

let cards = [];
let flippedCards = [];
let score = 0;

// Mélange les cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crée les cartes (questions et réponses mélangées)
function createGrid() {
    const fullDeck = shuffle([...cardData, ...cardData.map(card => ({ ...card, isDefinition: true }))]);

    fullDeck.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add(
            "w-40",
            "h-20",
            "rounded-lg",
            "bg-blue-500",
            "flex",
            "items-center",
            "justify-center",
            "text-white",
            "font-bold",
            "cursor-pointer"
        );
        card.setAttribute("data-id", item.id);
        card.setAttribute("data-type", item.isDefinition ? "definition" : "term");
        card.textContent = item.isDefinition ? item.definition : item.text;

        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
        cards.push(card);
    });
}

// Gère le retournement des cartes
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("bg-green-500")) {
        card.classList.remove("bg-blue-500");
        card.classList.add("bg-yellow-400");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Vérifie si les deux cartes retournées correspondent
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (
        card1.getAttribute("data-id") === card2.getAttribute("data-id") &&
        card1.getAttribute("data-type") !== card2.getAttribute("data-type")
    ) {
        card1.classList.remove("bg-yellow-400");
        card1.classList.add("bg-green-500");
        card2.classList.remove("bg-yellow-400");
        card2.classList.add("bg-green-500");

        score += 10;
        scoreDisplay.textContent = score;
    } else {
        setTimeout(() => {
            card1.classList.remove("bg-yellow-400");
            card1.classList.add("bg-blue-500");
            card2.classList.remove("bg-yellow-400");
            card2.classList.add("bg-blue-500");
        }, 1000);
    }

    flippedCards = [];
}

// Démarre le jeu
createGrid();
