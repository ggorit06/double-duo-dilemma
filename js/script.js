

const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");



let word = "";
let guessedLetters = [];
let remainingGuesses = 10;

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

const getWord = async function () {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[randomIndex];
  placeholder(word);
};

getWord();

const placeholder = function (word) {
  const separatedWordList = wordList.map(word => word.split(" "));
  const placeholderLetters = [];
  for (const letter of word) {
    if (letter === "/") {
      placeholderLetters.push(" ");
    } else {
      placeholderLetters.push("_");
    }
  }
  wordInProgress.innerText = placeholderLetters.join(" ");
};


guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  // Let's grab what was entered in the input
  const guess = letterInput.value;
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  letterInput.value = "";
});


const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // We finally got a single letter, omg yay
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updateGuessesRemaining(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

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
      revealWord.push("●");
    }
  }  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};
const updateGuessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    // womp womp - bad guess, lose a chance
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
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset all original values - grab new word
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  // Grab a new word
  getWord();

  // show the right UI elements
  guessLetterButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});

