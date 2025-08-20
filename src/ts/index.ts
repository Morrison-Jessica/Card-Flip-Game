// ---------------------
// Elements
// ---------------------
const gameBoard = document.getElementById("gameBoard") as HTMLDivElement; // Board container
const resetButton = document.getElementById("resetButton") as HTMLButtonElement; // Reset button
const attemptsDisplay = document.getElementById("attempts") as HTMLElement; // Attempts display

// ---------------------
// Card values (2 pairs → 4 cards total)
// ---------------------
const cardValues: string[] = ["A", "B"];

// ---------------------
// Game state
// ---------------------
let flippedCards: HTMLDivElement[] = []; // Currently flipped cards
let matchedCards: HTMLDivElement[] = []; // Matched cards
let attempts: number = 0; // Number of attempts used
const maxAttempts: number = 3; // Maximum allowed attempts

// ---------------------
// Helper: shuffle an array
// ---------------------
function shuffle(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5); // Random sort
}

// ---------------------
// Create the game board
// ---------------------
function createBoard(): void {
  // Clear board
  gameBoard.innerHTML = "";
  attempts = 0;
  attemptsDisplay.innerText = `Attempts: ${attempts}`;
  flippedCards = [];
  matchedCards = [];

  // Remove previous win message if exists
  const oldWin = document.getElementById("winMessage");
  if (oldWin) oldWin.remove();

  // Duplicate cards for matching and shuffle
  const cards = shuffle([...cardValues, ...cardValues]);

  // Create each card element
  cards.forEach((value) => {
    const card = document.createElement("div");
    card.className = "card"; // Card container
    card.dataset.value = value;

    const inner = document.createElement("div");
    inner.className = "card-inner"; // Inner flipping container

    const front = document.createElement("div");
    front.className = "front"; // Shows value
    front.innerText = value;

    const back = document.createElement("div");
    back.className = "back"; // Shows image

    // Assemble card structure
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // ---------------------
    // Event listener for flipping
    // ---------------------
    card.addEventListener("click", (event: MouseEvent) => flipCard(card));

    // Add card to board
    gameBoard.appendChild(card);
  });
}

// ---------------------
// Flip card logic
// ---------------------
function flipCard(card: HTMLDivElement): void {
  // Ignore click if already flipped, 2 cards are flipped, or max attempts reached
  if (card.classList.contains("flipped") || flippedCards.length === 2 || attempts >= maxAttempts) return;

  card.classList.add("flipped"); // Show front
  flippedCards.push(card);

  // Check if 2 cards are flipped
  if (flippedCards.length === 2) {
    attempts++; // Increment attempts
    attemptsDisplay.innerText = `Attempts: ${attempts}`;
    checkMatch();

    // Max attempts reached without winning
    if (attempts >= maxAttempts && matchedCards.length < cardValues.length * 2) {
      setTimeout(() => alert("❌ Maximum attempts reached! Click Reset to try again."), 200);
    }
  }
}

// ---------------------
// Check if flipped cards match
// ---------------------
function checkMatch(): void {
  const [card1, card2] = flippedCards;

  if (!card1 || !card2) return;

  if (card1.dataset.value === card2.dataset.value) {
    // Cards match → add to matched list
    matchedCards.push(card1, card2);
    flippedCards = [];

    // If all cards matched → show win message
    if (matchedCards.length === cardValues.length * 2) {
      showWinMessage();
    }
  } else {
    // Not a match → flip back after 0.8s
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

// ---------------------
// Show the "You Won!" message
// ---------------------
function showWinMessage(): void {
  // Prevent duplicate messages
  let winMessage = document.getElementById("winMessage");
  if (!winMessage) {
    winMessage = document.createElement("p");
    winMessage.id = "winMessage";
    winMessage.innerText = "🎉 You Won!";
    winMessage.style.textAlign = "center";
    winMessage.style.fontSize = "2rem";
    winMessage.style.color = "yellow";

    // Insert message above the game board
    const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
    if (gameContainer) {
      gameContainer.insertBefore(winMessage, gameBoard);
    }
  }
}

// ---------------------
// Reset button
// ---------------------
resetButton.addEventListener("click", createBoard);

// ---------------------
// Start game on page load
// ---------------------
document.addEventListener("DOMContentLoaded", createBoard);
