// Ajout d'animations sur les cartes de la page d'accueil
document.addEventListener("DOMContentLoaded", () => {
    const gameLinks = document.querySelectorAll("a.group");

    gameLinks.forEach(link => {
        // Ajoute un effet de zoom au survol
        link.addEventListener("mouseover", () => {
            link.classList.add("scale-105"); // Agrandit légèrement
        });

        link.addEventListener("mouseout", () => {
            link.classList.remove("scale-105");
        });

        // Ajoute un clic avec un léger feedback
        link.addEventListener("mousedown", () => {
            link.classList.add("scale-95"); // Réduit légèrement pour un effet "clic"
        });

        link.addEventListener("mouseup", () => {
            link.classList.remove("scale-95");
        });
    });

    // Ajoute un effet de transition doux à chaque carte
    gameLinks.forEach(link => {
        link.style.transition = "transform 0.2s ease-in-out";
    });
});
