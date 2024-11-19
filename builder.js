// Liste des notes sur le Builder
const notes = [
    {
        title: "Définition du Builder",
        content: `
<p>Le <span class="text-yellow-400 font-semibold">Builder</span> est un <span class="font-bold">design pattern</span> qui permet de construire des objets complexes étape par étape.</p>
<p>Il est particulièrement utile lorsque les objets possèdent de nombreux paramètres optionnels ou imbriqués.</p>
        `,
        analogy: "Construire une pizza : chaque ingrédient est ajouté étape par étape selon les préférences.",
    },
    {
        title: "Inner Holder",
        content: `
<p>La variante <span class="text-yellow-400 font-semibold">Inner Holder</span> utilise une classe statique interne pour encapsuler les étapes de construction de l'objet.</p>
        `,
        analogy: "Un chef dans une cuisine : la classe interne prépare tout et sert le plat final.",
    },
    {
        title: "Avantages du Builder",
        content: `
<ul class="list-disc list-inside">
    <li>Lisibilité accrue : chaque étape est clairement définie.</li>
    <li>Immutabilité : l'objet final est souvent immuable.</li>
    <li>Flexibilité : possibilité d'ajouter facilement de nouveaux paramètres.</li>
</ul>
        `,
        analogy: "Un menu de restaurant : chaque option est personnalisable sans compromettre la structure globale.",
    },
    {
        title: "Exemple de Code",
        content: `
<pre class="bg-gray-800 text-green-300 p-4 rounded-md overflow-auto">
<code>
public class Pizza {
    private final String size;
    private final boolean cheese;
    private final boolean pepperoni;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
    }

    public static class Builder {
        private final String size;
        private boolean cheese = false;
        private boolean pepperoni = false;

        public Builder(String size) {
            this.size = size;
        }

        public Builder addCheese() {
            this.cheese = true;
            return this;
        }

        public Builder addPepperoni() {
            this.pepperoni = true;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}
</code>
</pre>
        `,
        analogy: "Commander une pizza : choisissez la taille, les garnitures, et recevez une pizza parfaite !",
    },
];

// Conteneurs pour les notes et le quiz
const notesContainer = document.getElementById("notes-container");
const quizContainer = document.getElementById("quiz-container");

// Génération des notes interactives
notes.forEach(note => {
    const card = document.createElement("div");
    card.classList.add("bg-gray-800", "rounded-lg", "shadow-lg", "p-6", "overflow-hidden");

    // Titre
    const header = document.createElement("h2");
    header.classList.add("text-lg", "font-bold", "text-yellow-400", "mb-4", "cursor-pointer");
    header.textContent = note.title;

    // Contenu (caché par défaut)
    const content = document.createElement("div");
    content.classList.add("text-gray-300", "text-sm", "hidden");
    content.innerHTML = note.content;

    // Toggle visibility
    header.addEventListener("click", () => {
        content.classList.toggle("hidden");
    });

    // Append header and content
    card.appendChild(header);
    card.appendChild(content);
    notesContainer.appendChild(card);
});

// Quiz interactif
const quizQuestions = [
    {
        question: "Quelle méthode est utilisée pour finaliser la création d'un objet dans le Builder Pattern ?",
        options: [
            { text: "create()", correct: false },
            { text: "construct()", correct: false },
            { text: "build()", correct: true },
            { text: "finalize()", correct: false },
        ],
    },
    {
        question: "Quelle est la principale utilité du design pattern Builder ?",
        options: [
            { text: "Créer des objets complexes étape par étape", correct: true },
            { text: "Assurer qu'une classe n'a qu'une seule instance", correct: false },
            { text: "Partager une ressource unique entre plusieurs classes", correct: false },
            { text: "Organiser les classes dans une hiérarchie", correct: false },
        ],
    },
    {
        question: "Dans quel cas le Builder est particulièrement utile ?",
        options: [
            { text: "Pour gérer des objets simples avec peu de paramètres", correct: false },
            { text: "Pour gérer des objets avec de nombreux paramètres optionnels", correct: true },
            { text: "Pour assurer la synchronisation entre plusieurs threads", correct: false },
            { text: "Pour cacher la logique de création derrière une interface", correct: false },
        ],
    },
];

// Génération du quiz interactif
quizQuestions.forEach((quiz, index) => {
    const card = document.createElement("div");
    card.classList.add("bg-gray-800", "rounded-lg", "shadow-lg", "p-6");

    // Question
    const question = document.createElement("h2");
    question.classList.add("text-lg", "font-bold", "text-yellow-400", "mb-4");
    question.textContent = `Q${index + 1}: ${quiz.question}`;
    card.appendChild(question);

    // Options
    quiz.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add(
            "block",
            "bg-yellow-400",
            "hover:bg-yellow-500",
            "text-gray-900",
            "font-bold",
            "py-2",
            "px-4",
            "rounded",
            "mb-2",
            "w-full",
            "transition"
        );

        button.addEventListener("click", () => {
            if (option.correct) {
                button.classList.add("bg-green-500");
                alert("Bonne réponse !");
            } else {
                button.classList.add("bg-red-500");
                alert("Mauvaise réponse. Réessayez !");
            }
        });

        card.appendChild(button);
    });

    quizContainer.appendChild(card);
});
