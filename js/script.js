// This section of code selects the necessary HTML elements using their class names and stores them in variables for future use.

const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// These variables will be used to store the game data. The word to be guessed, the letters that have been guessed, and the remaining number of guesses.
let word = "";
let guessedLetters = [];
let remainingGuesses = 10;

// This is an array of possible words for the game. Each word is separated by a forward slash and consists of two parts.
let wordList = [
  "apple/pie",
  "baseball/bat",
  "coffee/mug",
  "dark/chocolate",
  "electric/guitar",
  "french/fries",
  "green/tea",
  "hot/sauce",
  "ice/cream",
  "jazz/music",
  "key/chain",
  "laptop/computer",
  "mountain/bike",
  "night/sky",
  "ocean/waves",
  "pizza/slice",
  "quiet/room",
  "rock/band",
  "sailing/ship",
  "taco/shell",
  "umbrella/stand",
  "vanilla/ice",
  "wooden/spoon",
  "x-ray/vision",
  "yoga/mat",
  "zebra/stripes",
  "airplane/mode",
  "beach/towel",
  "chocolate/cake",
  "double/espresso",
  "electric/scooter",
  "football/game",
  "grilled/cheese",
  "hot/chocolate",
  "ice/hockey",
  "jelly/beans",
  "kangaroo/pouch",
  "leather/jacket",
  "mountain/range",
  "night/owl",
  "orange/juice",
  "pencil/case",
  "queen/bee",
  "roller/coaster",
  "shower/gel",
  "table/tennis",
  "united/front",
  "vegetable/soup",
  "window/shade",
  "xylophone/music",
  "yellow/submarine",
  "zoo/animals"
];

// Define the placeholder function before the getWord function

// This function takes in a word from the wordList array and converts it into an array of separate words. It then creates an array of placeholder letters to represent the word to be guessed.
const placeholder = function (word) {
  const separatedWordList = wordList.map((word) => word.split(" "));
  const placeholderLetters = [];
  for (const letter of word) {
    if (letter === "/") {
      placeholderLetters.push(" ");
    } else {
      placeholderLetters.push("_");
    }
  }
  // The placeholderLetters array is joined and displayed as the initial state of the word in progress element.
  wordInProgress.innerText = placeholderLetters.join(" ");
};

// This function selects a random word from the wordList array and sets it as the word to be guessed. It then calls the placeholder function to update the display of the word in progress element.
const getWord = async function () {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[randomIndex];
  placeholder(word);
};

// The getWord function is called to start the game with a randomly selected word from the wordList array.
getWord();

// This event listener is added to the guessLetterButton element and listens for a click. When clicked, it calls the validateInput function and passes the value of the letterInput element as an argument.
guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const goodGuess = validateInput(guess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// This function validates the input provided by the user. If the input is empty, too long, or not a letter, an appropriate error message is displayed. If the input is valid, the function returns the input.
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

// This function takes in the user's guess as an argument. If the guess has already been made, an appropriate error message is displayed. If the guess is new, it is converted to uppercase and added to the guessedLetters array. The updateGuessesRemaining, showGuessedLetters, and updateWordInProgress functions are called to update the display.
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// This function updates the display of the guessed letters by first clearing the list and then creating a new list item for each letter in the guessedLetters array.
const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = ""; // Clear the list first
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

// This function takes in the guessedLetters array as an argument and updates the display of the word in progress element. It creates a new array called revealWord that consists of either the guessed letter, an underscore, or a space for each letter in the word to be guessed. The revealWord array is then joined and displayed as the updated state of the word in progress element. If the entire word has been guessed, a win message is displayed and the startOver function is called.
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];

  for (const letter of wordArray) {
    if (letter === "/") {
      revealWord.push(" ");
    } else if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("_");
    }
  }

  wordInProgress.innerText = revealWord.join("");

  const currentProgress = revealWord.join("").replace(/ /g, "/"); // Replace spaces back to slashes

  if (wordUpper === currentProgress) {
    message.classList.add("win");
    message.innerHTML = (
      `<p class="highlight">You guessed the correct word! Congrats!</p>`
    );
    startOver();
  }
};

// This function takes in the user's guess as an argument and updates the remaining guesses display and message. If the guess is incorrect, the remainingGuesses variable is decremented by 1. If the remainingGuesses reaches 0, a game over message is displayed and the startOver function is called. If there is only 1 guess remaining, the display is updated to reflect this. The checkIfWin function is called at the end.
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
  checkIfWin();
};

// This function checks if the entire word has been guessed by comparing the word to be guessed with the revealWord array, which is created similarly to the updateWordInProgress function. If the entire word has been guessed, a win message is displayed and the startOver function is called.

const checkIfWin = function () {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (letter === "/") {
      revealWord.push(" ");
    } else if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●"); // The letters that haven't been guessed yet are replaced with dots.
    }
  }
  if (wordUpper === revealWord.join("")) {
    message.classList.add("win");
    message.innerHTML = (
      `<p class="highlight">You guessed the correct word! Congrats!</p>`
    );
    startOver();
  }
};

// This function hides the guessLetterButton, remainingGuessesElement, and guessedLettersElement, and shows the playAgainButton when the game is over.

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

// This event listener is added to the playAgainButton and listens for a click. When clicked, it resets all the game variables to their original values, calls the getWord function to select a new word, and shows the appropriate UI elements.

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  getWord();

  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
