const notes = [
    {
        title: "Définition du Singleton",
        content: `
<p>Le <span class="text-yellow-400 font-semibold">Singleton</span> est un <span class="font-bold">design pattern</span> qui garantit qu'une classe n'a qu'<span class="font-semibold">une seule instance</span> et fournit un point d'accès global à cette instance.</p>
<p>Utilisation typique : gestion de la configuration, gestion des logs ou des connexions à une base de données.</p>
        `,
        analogy: "Un président : un seul leader officiel dirige un pays à la fois.",
    },
    {
        title: "Constructeur Privé",
        content: `
<p>Un <span class="text-yellow-400 font-semibold">constructeur privé</span> empêche de créer une nouvelle instance d'une classe avec <code>new</code>. Cela garantit qu'aucune autre instance du Singleton ne peut être créée.</p>
        `,
        analogy: "Un coffre-fort avec une clé unique que le constructeur garde secret.",
    },
    {
        title: "Méthode getInstance()",
        content: `
<p>La méthode <code>getInstance()</code> est utilisée pour obtenir l'instance unique du Singleton. Elle crée l'instance si elle n'existe pas encore.</p>
<pre class="bg-gray-800 text-green-300 p-4 rounded-md overflow-auto">
<code>
public static Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}
</code>
</pre>
        `,
        analogy: "Un distributeur automatique : si une boisson n'a pas été prise, la machine en fournit une seule.",
    },
    {
        title: "Thread Safety",
        content: `
<p>Dans un environnement <span class="text-yellow-400 font-semibold">multithread</span>, il est important d'assurer que l'instance n'est pas créée plusieurs fois. Cela peut être résolu avec le mot-clé <code>synchronized</code> dans la méthode <code>getInstance()</code>.</p>
        `,
        analogy: "Une file d'attente unique : tout le monde attend son tour pour accéder à une ressource partagée.",
    },
    {
        title: "Exemple d'utilisation",
        content: `
<p>Un Singleton peut être utilisé pour :</p>
<ul class="list-disc list-inside">
    <li>Un <span class="text-yellow-400 font-semibold">logger</span> pour écrire dans un fichier de log.</li>
    <li>Un <span class="text-yellow-400 font-semibold">gestionnaire de configuration</span> pour charger les paramètres d'une application.</li>
    <li>Un <span class="text-yellow-400 font-semibold">gestionnaire de connexions</span> pour accéder à une base de données.</li>
</ul>
        `,
        analogy: "Un serveur centralisé : toutes les demandes passent par une seule instance.",
    },
];

// Conteneurs pour les notes et le jeu Memory
const notesContainer = document.getElementById("notes-container");
const memoryContainer = document.getElementById("memory-container");

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

// Génération du jeu Memory (cartes)
const memoryPairs = notes.map(note => ({
    question: note.title,
    answer: note.analogy,
}));

const shuffledPairs = [...memoryPairs, ...memoryPairs].sort(() => 0.5 - Math.random());

shuffledPairs.forEach((pair, index) => {
    const card = document.createElement("div");
    card.classList.add(
        "bg-yellow-400",
        "text-gray-900",
        "font-bold",
        "text-center",
        "rounded-lg",
        "p-4",
        "shadow-lg",
        "cursor-pointer",
        "transform",
        "transition",
        "hover:scale-105"
    );
    card.setAttribute("data-index", index);
    card.textContent = pair.question || pair.answer;

    // Memory game logic
    card.addEventListener("click", () => {
        card.classList.toggle("bg-yellow-400");
        card.classList.toggle("bg-green-500");
    });

    memoryContainer.appendChild(card);
});
