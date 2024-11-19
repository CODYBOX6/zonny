const concepts = [
    {
        title: "Singleton Definition",
        description: "A design pattern that ensures a class has only one instance and provides a global point of access to it.",
    },
    {
        title: "Private Constructor",
        description: "Prevents instantiation of the class from outside, ensuring only one instance can be created.",
    },
    {
        title: "getInstance() Method",
        description: "A static method that returns the single instance of the class, creating it if necessary.",
    },
    {
        title: "Thread Safety",
        description: "In multithreaded environments, ensures that only one instance is created, even if multiple threads try to access it simultaneously.",
    },
    {
        title: "Example Code",
        description: `public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}`,
    },
    {
        title: "Real-Life Use Case",
        description: "Singleton is used in loggers, configuration managers, and database connections.",
    },
];

// Add each concept dynamically to the HTML
const conceptsContainer = document.getElementById("concepts");

concepts.forEach((concept, index) => {
    const card = document.createElement("div");
    card.classList.add(
        "bg-gray-800",
        "rounded-lg",
        "shadow-lg",
        "p-6",
        "transform",
        "transition",
        "duration-300",
        "hover:scale-105",
        "cursor-pointer"
    );

    // Content of each card
    card.innerHTML = `
        <h2 class="text-xl font-bold text-yellow-400 mb-4">${concept.title}</h2>
        <p class="text-sm">${concept.description}</p>
    `;

    // Add zoom-in and zoom-out effect on click
    card.addEventListener("click", () => {
        if (card.classList.contains("scale-125")) {
            card.classList.remove("scale-125");
        } else {
            // Remove zoom from all other cards first
            document.querySelectorAll(".scale-125").forEach((el) => el.classList.remove("scale-125"));
            card.classList.add("scale-125");
        }
    });

    // Append the card to the container
    conceptsContainer.appendChild(card);
});

// Reset all zooms
document.getElementById("resetButton").addEventListener("click", () => {
    document.querySelectorAll(".scale-125").forEach((el) => el.classList.remove("scale-125"));
});
