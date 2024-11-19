const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

const gridSize = 8;
const candyColors = ["bg-red-500", "bg-yellow-400", "bg-green-500", "bg-blue-500", "bg-purple-500"];
let candies = [];
let score = 0;

// Initialiser la grille
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const candy = document.createElement("div");
        candy.classList.add("w-12", "h-12", "rounded-lg", candyColors[Math.floor(Math.random() * candyColors.length)], "cursor-pointer");
        candy.setAttribute("draggable", true);
        candy.setAttribute("id", i);
        grid.appendChild(candy);
        candies.push(candy);
    }
}

// Vérifier les matches
function checkMatches() {
    // Lignes horizontales
    for (let i = 0; i < gridSize * gridSize; i++) {
        const rowStart = Math.floor(i / gridSize) * gridSize;
        const row = [i, i + 1, i + 2];
        if (row.every(index => candies[index] && candies[index].className === candies[i].className)) {
            row.forEach(index => {
                candies[index].className = "w-12 h-12 rounded-lg bg-gray-200"; // Grise après match
                score += 10;
            });
        }
    }

    // Colonnes verticales
    for (let i = 0; i < gridSize * (gridSize - 2); i++) {
        const column = [i, i + gridSize, i + gridSize * 2];
        if (column.every(index => candies[index] && candies[index].className === candies[i].className)) {
            column.forEach(index => {
                candies[index].className = "w-12 h-12 rounded-lg bg-gray-200";
                score += 10;
            });
        }
    }

    scoreDisplay.textContent = score;
}

// Faire tomber les bonbons
function dropCandies() {
    for (let i = gridSize * (gridSize - 1) - 1; i >= 0; i--) {
        if (candies[i].className === "w-12 h-12 rounded-lg bg-gray-200") {
            candies[i].className = candies[i - gridSize] ? candies[i - gridSize].className : candyColors[Math.floor(Math.random() * candyColors.length)];
            if (candies[i - gridSize]) candies[i - gridSize].className = "w-12 h-12 rounded-lg bg-gray-200";
        }
    }
}

// Drag and drop
let candyBeingDragged, candyBeingReplaced;

candies.forEach(candy => {
    candy.addEventListener("dragstart", dragStart);
    candy.addEventListener("dragend", dragEnd);
    candy.addEventListener("dragover", dragOver);
    candy.addEventListener("dragenter", dragEnter);
    candy.addEventListener("dragleave", dragLeave);
    candy.addEventListener("drop", dragDrop);
});

function dragStart() {
    candyBeingDragged = this;
}

function dragEnd() {
    const validMoves = [
        parseInt(candyBeingDragged.id) - 1,
        parseInt(candyBeingDragged.id) + 1,
        parseInt(candyBeingDragged.id) - gridSize,
        parseInt(candyBeingDragged.id) + gridSize,
    ];
    const replacedId = parseInt(candyBeingReplaced.id);

    if (validMoves.includes(replacedId)) {
        const draggedClass = candyBeingDragged.className;
        const replacedClass = candyBeingReplaced.className;

        candyBeingDragged.className = replacedClass;
        candyBeingReplaced.className = draggedClass;

        checkMatches();
        dropCandies();
    } else {
        candyBeingDragged.className = candyBeingDragged.className;
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    candyBeingReplaced = this;
}

// Démarrer le jeu
createGrid();
setInterval(() => {
    checkMatches();
    dropCandies();
}, 1000);
