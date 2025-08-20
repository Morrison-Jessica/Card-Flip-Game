"use strict";
// Waits until the page is fully loaded before running script
document.addEventListener("DOMContentLoaded", () => {
    // Select the game board container (where all cards live)
    const gameBoard = document.getElementById("game-board");
    // Paired card values 
    const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D"];
    // Shuffle cards in random order each game
    cardValues.sort(() => Math.random() - 0.5);
    // Creates each card element and adds to game board
    cardValues.forEach((value) => {
        const card = document.createElement("div"); // Creates new <div> for the card
        card.classList.add("card"); // Given class "card" for styling
        // Store card value in a dataset
        card.dataset.value = value;
        // Click event to flip card 
        card.addEventListener("click", () => {
            var _a;
            // Show the card’s value with textContent
            card.textContent = (_a = card.dataset.value) !== null && _a !== void 0 ? _a : "";
            // (?? "" makes sure it doesn’t throw an error if dataset.value is undefined)
        });
        // Adds card to the game board
        gameBoard.appendChild(card);
    });
});
