const notes = [
    {
        title: "Définition du Builder",
        content: `
<p>Le <span class="text-yellow-400 font-semibold">Builder</span> est un <span class="font-bold">design pattern</span> qui permet de construire des objets complexes de manière étape par étape.</p>
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

// Conteneur pour les notes interactives
const notesContainer = document.getElementById("notes-container");

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

// Ajout d'un quiz interactif
const quizContainer = document.getElementById("quiz-container");

const quizQuestion = {
    question: "Quelle méthode est utilisée pour finaliser la création d'un objet dans le Builder Pattern ?",
    options: [
        { text: "create()", correct: false },
        { text: "construct()", correct: false },
        { text: "build()", correct: true },
        { text: "finalize()", correct: false },
    ],
};

const questionCard = document.createElement("div");
questionCard.classList.add(
    "bg-gray-800",
    "rounded-lg",
    "shadow-lg",
    "p-6",
    "text-center",
    "text-gray-300"
);

const questionText = document.createElement("p");
questionText.textContent = quizQuestion.question;
questionText.classList.add("mb-4", "text-lg");

questionCard.appendChild(questionText);

quizQuestion.options.forEach(option => {
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
        "w-full"
    );

    button.addEventListener("click", () => {
        alert(option.correct ? "Bonne réponse ! 🎉" : "Mauvaise réponse. Réessaie !");
    });

    questionCard.appendChild(button);
});

quizContainer.appendChild(questionCard);
